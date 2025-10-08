import { Component, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexTitleSubtitle,
  ApexDataLabels
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  colors: string[];
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-sales-category-chart',
  templateUrl: './sales-category-chart.component.html',
  styleUrls: ['./sales-category-chart.component.css']
})
export class SalesCategoryChartComponent {
  @ViewChild('chart') chart: any;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [35, 45, 15, 5],
      chart: {
        type: 'pie',//donut
        height: 330,
      },
      labels: ['Men’s Wear', 'Women’s Wear', 'Kids Wear', 'Accessories'],
      colors: ['#1A73E8', '#4285F4', '#7BAAF7', '#C6DBFB'], // matching your image gradient tones
      dataLabels: {
        enabled: false
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '13px',
        itemMargin: {
          horizontal: 10,
          vertical: 4
        },
        labels: {
          useSeriesColors: false
        },
        formatter: (seriesName: string, opts: any) => {
          const value = opts.w.globals.series[opts.seriesIndex];
          return `${seriesName} - ${value}%`;
        }
      },
      // title: {
      //   text: 'Sales by Category',
      //   align: 'left',
      //   style: {
      //     fontSize: '16px',
      //     fontWeight: '600'
      //   }
      // },
      // subtitle: {
      //   text: "Today's distribution",
      //   align: 'left',
      //   style: {
      //     fontSize: '13px',
      //     color: '#777'
      //   }
      // },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 280
            },
            legend: {
              fontSize: '11px'
            }
          }
        }
      ]
    };
  }
}

