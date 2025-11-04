import { Component, OnInit } from "@angular/core";
import {
  ApexChart,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexLegend,
  ApexTooltip,
  ApexTitleSubtitle,
} from "ng-apexcharts";
import { ViolationService } from "../services/violation.service";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  colors: string[];
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  title: ApexTitleSubtitle;
};

@Component({
  selector: "app-heatmap-chart",
  templateUrl: "./heatmap-chart.component.html",
  styleUrls: ["./heatmap-chart.component.css"],
})
export class HeatmapChartComponent implements OnInit {
  public chartOptions!: Partial<ChartOptions>;

  constructor(private violationService: ViolationService) { }

  ngOnInit(): void {
    this.loadHeatMapData();
  }

  loadHeatMapData() {
    try {
      this.violationService.getHeatMap().subscribe({
        next: (data) => {
          try {
            const realData = data.map((item: any) => ({
              ...item,
              type: "real",
            }));

            const dummyData = [
              { sectionName: "Readywear", visitorCount: 1200, avgStaySeconds: 180, type: "dummy" },
              { sectionName: "Unstitched", visitorCount: 950, avgStaySeconds: 240, type: "dummy" },
              { sectionName: "Beauty", visitorCount: 560, avgStaySeconds: 160, type: "dummy" },
              { sectionName: "Accessories", visitorCount: 480, avgStaySeconds: 120, type: "dummy" },
              { sectionName: "Bags", visitorCount: 510, avgStaySeconds: 110, type: "dummy" },
            ];

            const allData = [...realData, ...dummyData];
            const min = Math.min(...allData.map((d) => d.visitorCount));
            const max = Math.max(...allData.map((d) => d.visitorCount));

            const adjustedData = allData.map((item) => ({
              ...item,
              weightedY:
                item.type === "real"
                  ? Math.log(item.visitorCount + 1) * 80
                  : Math.log(item.visitorCount + 1) * 50,
            }));

            this.initializeTreemap(adjustedData);
          } catch (innerErr) {
            console.error("🔥 Error processing heatmap data:", innerErr);
            this.loadFallbackChart();
          }
        },
        error: (err) => {
          console.error("❌ API error fetching heatmap data:", err);
          this.loadFallbackChart();
        },
      });
    } catch (outerErr) {
      console.error("💥 Unexpected error in loadHeatMapData:", outerErr);
      this.loadFallbackChart();
    }
  }
  private loadFallbackChart() {
    const dummyData = [
      { sectionName: "Readywear", visitorCount: 1200, avgStaySeconds: 180, type: "dummy" },
      { sectionName: "Unstitched", visitorCount: 950, avgStaySeconds: 240, type: "dummy" },
      { sectionName: "Beauty", visitorCount: 560, avgStaySeconds: 160, type: "dummy" },
      { sectionName: "Accessories", visitorCount: 480, avgStaySeconds: 120, type: "dummy" },
      { sectionName: "Bags", visitorCount: 510, avgStaySeconds: 110, type: "dummy" },
    ];

    const adjustedData = dummyData.map((item) => ({
      ...item,
      weightedY: Math.log(item.visitorCount + 1) * 50,
    }));

    this.initializeTreemap(adjustedData);
  }


  initializeTreemap(data: any[]) {
    // ✅ Professional dual-tone palette (Green for real, Red for dummy)
    const realColors = [
      "#2E7D32", // Deep green
      "#388E3C", // Mid green
      "#43A047", // Standard green
      "#4CAF50", // Fresh green
      "#66BB6A", // Light green
    ];

    const dummyColors = [
      "#C62828", // Deep red
      "#D32F2F", // Bold red
      "#E53935", // Vibrant red
      "#EF5350", // Soft red
      "#FF7043", // Warm coral red
      "#FF8A65", // Light tone
    ];

    let realIndex = 0;
    let dummyIndex = 0;

    const formattedData = data.map((item) => {
      const color =
        item.type === "real"
          ? realColors[realIndex++ % realColors.length]
          : dummyColors[dummyIndex++ % dummyColors.length];

      return {
        x: item.sectionName,
        y: item.weightedY, // 🧠 chart area size
        actualVisitors: item.visitorCount, // ✅ for tooltip/label
        avgStay: item.avgStaySeconds,
        fillColor: color,
      };
    });

    this.chartOptions = {
      series: [
        {
          name: "Visitor Count",
          data: formattedData,
        },
      ],
      chart: {
        height: 300,
        type: "treemap",
        toolbar: { show: true },
      },
      colors: [],
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "13px",
          fontWeight: "600",
          colors: ["#fff"],
        },
        formatter: function (text: string | number, opt: any) {
          const point = opt.w.config.series[0].data[opt.dataPointIndex];
          const label = String(text);
          const value = point.actualVisitors;

          // ✨ Wrap long section names
          let displayLabel = label;
          if (label.length > 12) {
            const half = Math.ceil(label.length / 2);
            displayLabel = `${label.substring(0, half)}\n${label.substring(half)}`;
          }

          return `${displayLabel}\n${value} visitors`;
        },
      },
      legend: { show: false },
      tooltip: {
        enabled: true,
        custom: ({ seriesIndex, dataPointIndex, w }) => {
          const point = w.config.series[seriesIndex].data[dataPointIndex];
          return `
            <div style="padding:8px; background:#2d2d2d; color:#fff; border-radius:6px;">
              <strong>${point.x}</strong><br>
              Visitors: ${point.actualVisitors}<br>
              Avg Stay: ${point.avgStay?.toFixed(1)} sec
            </div>`;
        },
      },
      title: {
        // text: "Visitor Intensity Treemap — Sapphire Outlet",
        align: "left",
        style: {
          fontSize: "18px",
          fontWeight: "600",
          color: "#333",
        },
      },
    };
  }
}
