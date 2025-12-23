import { Component, OnInit, NgZone } from "@angular/core";
import {
  ApexChart,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexLegend,
  ApexTooltip,
  ApexTitleSubtitle,
} from "ng-apexcharts";
import { ViolationService } from "../services/violation.service";
import { SectionHourlyDialogComponent } from "../section-hourly-dialog/section-hourly-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import {DataService} from '../../service/DataService'
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
  isLoading: boolean = false; // 🔹 Loading state

  constructor(private ngZone: NgZone, private violationService: ViolationService, private dialog: MatDialog,private dataService: DataService) { }

  ngOnInit(): void {
    this.loadHeatMapData();
  }
  loadHeatMapData() {
    const companyName = this.getCompanyName(); // "Namak Mandi", etc.

    const api$ =
      companyName?.toLowerCase() === 'namakmandi'
        ? this.violationService.getHeatMapDetails()
        : this.violationService.getHeatMap();

    api$.subscribe({
      next: (data) => {
        debugger
        try {
          const realData = data.map((item: any) => ({
            ...item,
            type: 'real',
          }));

          // ✅ Sort descending
          const sorted = [...realData].sort(
            (a, b) => b.visitorCount - a.visitorCount
          );

          const largest = sorted[0];
          const others = sorted.slice(1);

          const visitorCounts = realData.map(d => d.visitorCount);
          const min = Math.min(...visitorCounts);
          const max = Math.max(...visitorCounts);

          const scale = (
            value: number,
            min: number,
            max: number,
            newMin: number,
            newMax: number
          ) => {
            if (max === min) return (newMin + newMax) / 2;
            return ((value - min) / (max - min)) * (newMax - newMin) + newMin;
          };

          const largestMapped = {
            ...largest,
            weightedY: scale(largest.visitorCount, min, max, 60, 100),
          };

          const othersMapped = others.map(item => ({
            ...item,
            weightedY: scale(item.visitorCount, min, max, 20, 60),
          }));

          const finalData = [largestMapped, ...othersMapped];

          this.initializeTreemap(finalData);
        } catch (err) {
          console.error('🔥 Error processing heatmap data:', err);
          this.loadFallbackChart();
        }
      },
      error: (err) => {
        console.error('❌ API error fetching heatmap data:', err);
        this.loadFallbackChart();
      },
    });
  }
  getCompanyName(): string {
  const companyCode = this.dataService.getCompanyCode();
  if (!companyCode) {
    return '';
  }

  return companyCode.toString().toLowerCase();
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
        height: 290,
        type: "treemap",
        toolbar: { show: true },
        offsetX: 0,
        offsetY: 25, // Push treemap down so toolbar is clear
        events: {
          dataPointSelection: (event, chartContext, config) => {
            const point = config.w.config.series[0].data[config.dataPointIndex];

            this.ngZone.run(() => {
              this.openSectionDialog(point);
            });
          },
        },
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

          return `${displayLabel}\n${value}`;
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
  openSectionDialog(sectionName: string) {
    this.isLoading = true;

    this.violationService.getHourlyFootfallAllAreas().subscribe((data) => {
      setTimeout(() => { this.isLoading = false; }, 100); // ensures repaint

      const dialogRef = this.dialog.open(SectionHourlyDialogComponent, {
        width: "1200px",
        maxHeight: "90vh",
        autoFocus: false,
        panelClass: "hourly-dialog-panel",
        backdropClass: "blur-background",
        data: { section: sectionName, allAreas: data }
      });

      dialogRef.afterClosed().subscribe(() => {
        document.body.classList.remove("dialog-open-blur");
      });
    });
  }

  private generateDummyData(realData: any[]) {
    const avg = realData.reduce((sum, x) => sum + x.visitorCount, 0) / realData.length;

    return [
      { sectionName: "Readywear", visitorCount: avg * 1.25, avgStaySeconds: 180, type: "dummy" },
      { sectionName: "Unstitched", visitorCount: avg * 1.1, avgStaySeconds: 240, type: "dummy" },
      { sectionName: "Beauty", visitorCount: avg * 0.7, avgStaySeconds: 160, type: "dummy" },
      { sectionName: "Accessories", visitorCount: avg * 0.6, avgStaySeconds: 120, type: "dummy" },
      { sectionName: "Bags", visitorCount: avg * 0.65, avgStaySeconds: 110, type: "dummy" },
    ];
  }


}
