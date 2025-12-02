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
export class LiveFootfallChartComponent implements OnInit {
  @ViewChild("chart") chart: any;
  public chartOptions: Partial<ChartOptions> = {};

  footfallData: number[] = [];
  conversionData: number[] = [];
  xLabels: string[] = [];

  constructor(private violationService: ViolationService) {}

  ngOnInit(): void {
    this.loadFootfallData();
    this.loadConversionRate();
  }

  // ---------------------------
  // Load Footfall Data
  // ---------------------------
  loadFootfallData(): void {
    this.violationService.getHourlyFootfall()
      .pipe(catchError(() => of([])))
      .subscribe((data: any[]) => {

        const startHour = 11;
        const endHour = 22;

        this.xLabels = Array.from({ length: endHour - startHour + 1 }, (_, i) =>
          `${String(startHour + i).padStart(2, '0')}:00`
        );

        const hourMap = new Map<number, number>();
        data.forEach(item => {
          const h = Number(item.hourOfDay);
          const visits = Number(item.visitCount) || 0;
          hourMap.set(h, (hourMap.get(h) || 0) + visits);
        });

        this.footfallData = this.xLabels.map((_, idx) =>
          hourMap.get(startHour + idx) ?? 0
        );

        this.setupChart();
      });
  }

  // ---------------------------
  // Load Conversion Rate (ROUNDED + %)
  // ---------------------------
  loadConversionRate(): void {
    this.violationService.getHourlyConversionRate()
      .pipe(catchError(() => of({})))
      .subscribe((data: any) => {

        const startHour = 11;
        const endHour = 22;

        const convMap = new Map<number, number>();

        Object.keys(data).forEach(key => {
          const hour = Number(key);
          const rate = data[key]?.[0]?.conversionRate ?? 0;

          const rounded = Math.round(rate);  // 🟢 Round into integer
          convMap.set(hour, rounded);
        });

        this.conversionData = [];
        for (let hr = startHour; hr <= endHour; hr++) {
          this.conversionData.push(convMap.get(hr) ?? 0);
        }

        this.setupChart();
      });
  }

  // ---------------------------
  // Setup Chart
  // ---------------------------
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
          data: [40, 80, 150, 260, 400, 520, 680, 750, 720, 630, 520, 410]
        },
        {
          name: 'Conversion Rate',
          type: 'line',
          data: this.conversionData
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

      // -----------------------------
      // Y-Axis: Show integer + %
      // -----------------------------
      yaxis: [
        {
          title: { text: '' },
          labels: {
            style: { fontSize: '12px' },
            formatter: (val) => val.toString()
          }
        },
        {
          opposite: true,
          title: { text: '' },
          labels: {
            formatter: (val) => val + " %"
          }
        }
      ],

      // -----------------------------
      // Tooltip Formatter (add % only for conversion)
      // -----------------------------
      tooltip: {
  shared: true,
  intersect: false,
  y: {
    formatter: (value, { seriesIndex }) => {
      if (seriesIndex === 2) {
        return value + "%";
      }
      return value.toString();
    }
  }
},


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
