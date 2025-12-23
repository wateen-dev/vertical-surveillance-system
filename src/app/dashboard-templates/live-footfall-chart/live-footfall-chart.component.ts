import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ApexDataLabels,
  ApexTooltip,
  ApexFill,
  ApexMarkers,
  ApexTitleSubtitle,
  ApexLegend
} from 'ng-apexcharts';
import { catchError, forkJoin, of } from "rxjs";
import { ViolationService } from '../services/violation.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  tooltip: ApexTooltip;
  fill: ApexFill;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  colors: string[];
};

@Component({
  selector: 'app-live-footfall-chart',
  templateUrl: './live-footfall-chart.component.html',
  styleUrls: ['./live-footfall-chart.component.css']
})
export class LiveFootfallChartComponent implements OnInit {
  @ViewChild("chart") chart: any;
  public chartOptions: Partial<ChartOptions> = {};

  footfallData: number[] = [];
  conversionData: number[] = [];
  revenueData: number[] = [];
  xLabels: string[] = [];

  constructor(private violationService: ViolationService) { }

  ngOnInit(): void {
    this.loadAllData();
  }

 loadAllData(): void {
  forkJoin({
    footfall: this.violationService.getHourlyFootfall().pipe(catchError(() => of([]))),
    conversion: this.violationService.getHourlyConversionRate().pipe(catchError(() => of({})))
  }).subscribe(({ footfall, conversion }) => {
    if (!footfall.length) return;

    // 1️⃣ Determine min and max hours from footfall data
    const hours = footfall.map(f => Number(f.hourOfDay));
    let minHour = Math.min(...hours) - 2;
    let maxHour = Math.max(...hours) + 2;

    // Wrap around for 24-hour clock
    if (minHour < 0) minHour += 24;
    if (maxHour > 23) maxHour -= 24;

    // 2️⃣ Generate X-axis labels with wrap-around
    const xLabels: string[] = [];
    const totalHours = (maxHour >= minHour) ? maxHour - minHour + 1 : (24 - minHour) + (maxHour + 1);

    for (let i = 0; i < totalHours; i++) {
      const hour = (minHour + i) % 24;
      xLabels.push(`${String(hour).padStart(2, '0')}:00`);
    }
    this.xLabels = xLabels;

    // 3️⃣ Map footfall data
    const footfallMap = new Map<number, number>();
    footfall.forEach(f => footfallMap.set(Number(f.hourOfDay), Number(f.visitCount)));
    this.footfallData = xLabels.map(label => {
      const hour = Number(label.split(':')[0]);
      return footfallMap.get(hour) ?? 0;
    });

    // 4️⃣ Map conversion data
    const convData: Record<string, any> = conversion as Record<string, any>;
    const convMap = new Map<number, number>();
    Object.keys(convData).forEach(key => {
      const h = Number(key);
      const rate = convData[key]?.[0]?.conversionRate ?? 0;
      convMap.set(h, Math.round(rate));
    });
    this.conversionData = xLabels.map(label => {
      const hour = Number(label.split(':')[0]);
      return convMap.get(hour) ?? 0;
    });

    // 5️⃣ Generate dummy revenue proportional to footfall
    this.revenueData = this.footfallData.map(f => Math.round(f * (0.5 + Math.random() * 1.5)));

    // 6️⃣ Setup chart
    this.setupChart();
  });
}


  setupChart(): void {
    this.chartOptions = {
      series: [
        { name: 'Footfall', type: 'area', data: this.footfallData },
        { name: 'Revenue', type: 'area', data: this.revenueData },
        { name: 'Conversion Rate', type: 'line', data: this.conversionData }
      ],
      chart: { type: 'area', height: 350, toolbar: { show: false }, zoom: { enabled: false } },
      colors: ['#1A73E8', '#34A853', '#F9AB00'],
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: [3, 3, 2] },
      fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1, stops: [0, 90, 100] } },
      markers: { size: 4 },
      xaxis: { categories: this.xLabels, labels: { style: { fontSize: '12px' } } },
      yaxis: [
        { title: { text: '' }, labels: { style: { fontSize: '12px' }, formatter: val => val.toString() } },
        { opposite: true, title: { text: '' }, labels: { formatter: val => val + " %" } }
      ],
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (value, { seriesIndex }) => seriesIndex === 2 ? value + "%" : value.toString()
        }
      },
      legend: { position: 'top', horizontalAlign: 'left', fontSize: '13px' },
      title: { align: 'left', style: { fontSize: '16px', fontWeight: '600' } }
    };
  }
}
