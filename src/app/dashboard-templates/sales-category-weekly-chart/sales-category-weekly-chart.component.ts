import { Component, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexStroke,
  ApexXAxis,
  ApexYAxis,
  ApexTooltip,
  ApexLegend,
  ApexMarkers,
  ApexGrid,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  tooltip: ApexTooltip;
  legend: ApexLegend;
  markers: ApexMarkers;
  grid: ApexGrid;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  colors: string[];
};

@Component({
  selector: "app-sales-category-weekly-chart",
  templateUrl: "./sales-category-weekly-chart.component.html",
  styleUrls: ["./sales-category-weekly-chart.component.css"],
})
export class SalesCategoryWeeklyChartComponent {
  @ViewChild("chart") chart: any;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Revenue",
          type: "line",
          data: [5.0, 5.1, 5.2, 5.4, 7.8, 9.0, 8.2], // in millions
        },
        {
          name: "Security Incidents",
          type: "line",
          data: [4, 2, 3, 1.5, 4.2, 3.8, 2.9],
        },
      ],
      chart: {
        height: 300,
        type: "line",
        toolbar: { show: false },
      },
      colors: ["#1E88E5", "#E53935"],
      stroke: {
        width: [3, 3],
        curve: "smooth",
        dashArray: [0, 6], // second line dotted
      },
      dataLabels: { enabled: false },
      markers: {
        size: [5, 5],
        colors: ["#fff"],
        strokeColors: ["#1E88E5", "#E53935"],
        strokeWidth: 2,
      },
      grid: {
        borderColor: "#f1f1f1",
        strokeDashArray: 4,
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        labels: {
          style: {
            colors: "#9E9E9E",
            fontSize: "12px",
          },
        },
      },
      yaxis: [
        {
          title: { text: "" },
          labels: {
            formatter: (val) => `${val.toFixed(1)}M`,
            style: { colors: "#1E88E5" },
          },
          min: 0,
          max: 10,
          tickAmount: 5,
        },
        {
          opposite: true,
          title: { text: "" },
          labels: {
            formatter: (val) => `${val}`,
            style: { colors: "#E53935" },
          },
          min: 0,
          max: 5,
          tickAmount: 5,
        },
      ],
      tooltip: {
        shared: true,
        intersect: false,
      },
      legend: {
        show: false,
      },
      title: {
        // text: "Weekly Trends",
        align: "left",
        style: {
          fontSize: "16px",
          fontWeight: "600",
          color: "#111827",
        },
      },
      subtitle: {
        // text: "Sales performance & security monitoring",
        align: "left",
        style: {
          fontSize: "12px",
          color: "#6B7280",
        },
      },
    };
  }
}
