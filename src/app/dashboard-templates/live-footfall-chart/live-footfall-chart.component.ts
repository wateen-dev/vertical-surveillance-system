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
import { catchError, of } from "rxjs";
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
export class LiveFootfallChartComponent implements OnInit{
  @ViewChild("chart") chart: any;
  public chartOptions: Partial<ChartOptions> = {};
  footfallData: number[] = [];
  xLabels: string[] = [];

  constructor(private violationService: ViolationService) {}

  ngOnInit(): void {
    this.loadFootfallData();
  }

  loadFootfallData(): void {
    this.violationService.getHourlyFootfall()
      .pipe(catchError(() => of([])))
      .subscribe((data: any[]) => {
        // configure start/end hours (inclusive)
        const startHour = 11;
        const endHour = 22;

        // Build x-axis labels dynamically: ["11:00", "12:00", ...]
        this.xLabels = Array.from({ length: endHour - startHour + 1 }, (_, i) =>
          `${String(startHour + i).padStart(2, '0')}:00`
        );

        // Build map of hour -> visitCount (summing if duplicates)
        const hourMap = new Map<number, number>();
        data.forEach(item => {
          const h = Number(item.hourOfDay);
          const visits = Number(item.visitCount) || 0;

          // If your API returns hourOfDay in UTC and you want Asia/Karachi (UTC+5),
          // uncomment the next line to convert:
          // const localHour = (h + 5) % 24;
          // use localHour instead of h if conversion is required.

          const key = h; // or use localHour if converting
          hourMap.set(key, (hourMap.get(key) || 0) + visits);
        });

        // Map xLabels to their corresponding hours (startHour + idx) and fill missing with 0
        this.footfallData = this.xLabels.map((_, idx) => hourMap.get(startHour + idx) ?? 0);

        this.setupChart();
      });
  }

  setupChart(): void {
    this.chartOptions = {
      series: [
        {
          name: 'Footfall',
          type: 'area',
          data: this.footfallData
        },
        {
          name: 'Revenue',
          type: 'area',
          data: [40, 80, 150, 260, 400, 520, 680, 750, 720, 630, 520, 410] // dummy
        },
        {
          name: 'Conversions',
          type: 'line',
          data: [10, 20, 30, 60, 80, 90, 100, 110, 120, 130, 140, 150] // dummy
        }
      ],
      chart: {
        type: 'area',
        height: 350,
        toolbar: { show: false },
        zoom: { enabled: false }
      },
      colors: ['#1A73E8', '#34A853', '#F9AB00'],
      dataLabels: { enabled: false },
      stroke: {
        curve: 'smooth',
        width: [3, 3, 2]
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 90, 100]
        }
      },
      markers: { size: 4 },
      xaxis: {
        categories: this.xLabels,
        labels: { style: { fontSize: '12px' } }
      },
      yaxis: [
        {
          title: { text: '' },
          labels: { style: { fontSize: '12px' } }
        },
        {
          opposite: true,
          title: { text: '' }
        }
      ],
      tooltip: { shared: true, intersect: false },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        fontSize: '13px'
      },
      title: {
        align: 'left',
        style: { fontSize: '16px', fontWeight: '600' }
      }
    };
  }
}
