import { Component } from "@angular/core";
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexStroke,
  ApexDataLabels,
  ApexTooltip,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexAxisChartSeries,
  ChartType,
  ApexResponsive
} from "ng-apexcharts";

export interface MetricCard {
  title: string;
  percentage: number;
  change: string;
  color: string;
  chartData: number[];
}

@Component({
  selector: "app-performance-metrics",
  templateUrl: "./performance-metrics.component.html",
  styleUrls: ["./performance-metrics.component.css"]
})
export class PerformanceMetricsComponent {
  metrics: MetricCard[] = [
    {
      title: "Loss Prevention",
      percentage: 60,
      change: "+2.1%",
      color: "#1460AA",
      chartData: [50, 64]
    },
    {
      title: "Employee Efficiency",
      percentage: 70,
      change: "+5.3%",
      color: "#1460AA",
      chartData: [60, 62, 70]
    },
    {
      title: "Customer Satisfaction",
      percentage: 80,
      change: "+1.7%",
      color: "#1460AA",
      chartData: [65, 77, 80]
    },
    {
      title: "Inventory Accuracy",
      percentage: 90,
      change: "+0.8%",
      color: "#1460AA",
      chartData: [66, 74, 78.5, 90]
    }
  ];

  // ✅ FIX: Explicitly type these so Angular understands them

  getChartOptions(label: string, value: number, color: string): {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    plotOptions: ApexPlotOptions;
    dataLabels: ApexDataLabels;
    stroke: ApexStroke;
    fill: ApexFill;
    colors: string[];
    tooltip: ApexTooltip;
  } {
    return {
      series: [value, 100 - value],
      chart: {
        type: 'donut' as ChartType,
        height: 180,
        sparkline: { enabled: true }
      },
      colors: [color, '#E5E7EB'], // filled + remaining
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
            labels: {
              show: true,
              value: {
                show: true,
                fontSize: '22px',
                fontWeight: '700',
                color: '#111827',
                formatter: () => `${value}%`
              }
            }
          }
        }
      },
      dataLabels: { enabled: false },
      stroke: { show: false },
      fill: { type: 'solid' },
      tooltip: {
        enabled: true,
        theme: 'dark',
        y: {
          formatter: (val: number) => `${label}: ${val}%`
        },
        custom: ({ series, seriesIndex, w }) => {
          // Ensure tooltip shows only for the main filled segment
          if (seriesIndex === 0) {
            return `<div style="padding:4px 8px;font-size:13px;">
                    <strong>${label}:</strong> ${value}%
                  </div>`;
          }
          return '';
        }
      }
    };
  }



  getLineOptions(label: string, value: number, color: string) {
    return {
      series: [
        {
          data: [value]
        }
      ],
      chart: {
        type: 'bar' as ChartType,
        height: 20,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '60%',
          borderRadius: 4,
          colors: {
            backgroundBarColors: ['#E5E7EB'], // Light gray track
            backgroundBarOpacity: 1
          }
        }
      },
      colors: [color],
      tooltip: {
        enabled: true,
        theme: 'dark',
        y: {
          formatter: (val: number) => `${label}: ${val}%`
        }
      },
      grid: {
        show: false
      },
      xaxis: {
        min: 0,
        max: 100,
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        show: false
      },
      dataLabels: {
        enabled: false
      }
    };
  }
}
