import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-graph-heatmap',
  templateUrl: './graph-heatmap.component.html',
  styleUrls: ['./graph-heatmap.component.css']
})
export class GraphHeatmapComponent implements AfterViewInit {
  @ViewChild('plots', { static: true }) plotEl!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const Plotly = await import('plotly.js-dist-min'); // load only in browser

      // Now build your zData
      const size = 40;
      const zData: number[][] = [];
      for (let i = 0; i < size; i++) {
        const row: number[] = [];
        for (let j = 0; j < size; j++) {
          const value =
            Math.sin(i / 4) * Math.cos(j / 4) * 2 +
            Math.sin(i / 6) * Math.cos(j / 3) +
            Math.random() * 0.2;
          row.push(value);
        }
        zData.push(row);
      }

      const data: Plotly.Data[] = [
        {
          z: zData,
          type: 'contour',
          colorscale: 'Jet',
          contours: { coloring: 'heatmap', showlines: true },
          line: { color: 'white', width: 2, smoothing: 1.3 },
          hoverinfo: 'z'
        }
      ];

      const layout: Partial<Plotly.Layout> = {
        margin: { l: 30, r: 30, t: 30, b: 30 },
        paper_bgcolor: 'white',
        plot_bgcolor: 'white',
        xaxis: { showgrid: false, zeroline: false, showticklabels: false },
        yaxis: { showgrid: false, zeroline: false, showticklabels: false },
        hovermode: 'closest'
      };

      Plotly.newPlot(this.plotEl.nativeElement, data, layout, { responsive: true });
    }
  }
}
