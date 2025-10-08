import { Component, ViewChild } from '@angular/core';
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
export class LiveFootfallChartComponent {
  @ViewChild('chart') chart: any;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Footfall',
          type: 'area',
          data: [120, 180, 260, 350, 460, 570, 680, 790, 710]
        },
        {
          name: 'Revenue',
          type: 'area',
          data: [80, 140, 200, 270, 350, 430, 500, 560, 490]
        },
        {
          name: 'Conversions',
          type: 'line',
          data: [20, 40, 90, 150, 210, 270, 330, 380, 340]
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
        categories: ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'],
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
