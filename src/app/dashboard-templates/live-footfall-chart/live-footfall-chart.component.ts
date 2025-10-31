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

  constructor(private violationService: ViolationService) {}

  ngOnInit(): void {
    this.loadFootfallData();
  }

  loadFootfallData(): void {
    this.violationService.getHourlyFootfall()
      .pipe(catchError(() => of([])))
      .subscribe((data: any[]) => {
        // ✅ Extract visit counts and fill missing hours (09:00–20:00)
        const hours = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'];
        const hourMap = new Map(data.map(item => [item.hourOfDay, item.visitCount]));

        this.footfallData = hours.map((h, i) => hourMap.get(i + 9) || 0);

        this.setupChart();
      });
  }

  setupChart(): void {
    this.chartOptions = {
      series: [
        {
          name: 'Footfall',
          type: 'area',
          data: this.footfallData // ✅ Real API data
        },
        {
          name: 'Revenue',
          type: 'area',
          data: [40, 80, 150, 260, 400, 520, 680, 750, 720, 630, 520, 410] // 🧩 Dummy
        },
        {
          name: 'Conversions',
          type: 'line',
          data: [180, 280, 380, 520, 1050, 1280, 1600, 1850, 1750, 1500, 1200, 900] // 🧩 Dummy
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
        categories: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
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
        text: 'Live Footfall & Revenue Tracking',
        align: 'left',
        style: { fontSize: '16px', fontWeight: '600' }
      }
    };
  }
}