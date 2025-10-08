import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-floor-heatmap',
  templateUrl: './floor-heatmap.component.html',
  styleUrls: ['./floor-heatmap.component.css']
})
export class FloorHeatmapComponent implements AfterViewInit {
  @ViewChild('plot', { static: true }) plotEl!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const Plotly = await import('plotly.js-dist-min');

      // -------------------------------
      // Simulated people count per floor
      // -------------------------------
      const floors = ['Basement', 'Ground', '1st Floor', '2nd Floor'];
      const floorLevels = [0, 1, 2, 3]; // Z axis values

      const xSize = 10; // left ↔ right
      const ySize = 10; // front ↔ back

      // Generate fake people density data
      const surfaces: Plotly.Data[] = [];
      floors.forEach((floor, idx) => {
        const zLayer: number[][] = [];
        for (let i = 0; i < ySize; i++) {
          const row: number[] = [];
          for (let j = 0; j < xSize; j++) {
            // Example distribution: higher traffic near entrances (front-middle)
            const value =
              Math.exp(-((i - 3) ** 2 + (j - 5) ** 2) / 10) * 80 + // hotspot center
              Math.random() * 10; // random noise
            row.push(value);
          }
          zLayer.push(row);
        }

        surfaces.push({
          z: zLayer.map(r => r.map(() => floorLevels[idx])), // flat z at floor level
          surfacecolor: zLayer, // color intensity = people count
          type: 'surface',
          colorscale: 'YlOrRd', // vibrant: yellow → orange → red
          opacity: 0.9,
          showscale: idx === floors.length - 1, // show scale once
          name: floor,
          hovertemplate: `${floor}<br>X:%{x}, Y:%{y}<br>People: %{surfacecolor}<extra></extra>`
        } as Plotly.Data);
      });

      // -------------------------------
      // Layout Styling
      // -------------------------------
   const layout: Partial<Plotly.Layout> = {
  title: { text: 'Sapphire Outlet' },
  margin: { l: 0, r: 0, t: 40, b: 0 },
  scene: {
    xaxis: { title: { text: 'Left ↔ Right' }, showgrid: false },
    yaxis: { title: { text: 'Front ↔ Back' }, showgrid: false },
    zaxis: {
      title: { text: 'Floors' },
      tickvals: floorLevels,
      ticktext: floors,
    },
  },
  paper_bgcolor: 'white',
  plot_bgcolor: 'white',
};


      Plotly.newPlot(this.plotEl.nativeElement, surfaces, layout, { responsive: true });
    }
  }
}
