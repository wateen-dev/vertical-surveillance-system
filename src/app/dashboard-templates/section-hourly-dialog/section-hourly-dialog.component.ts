import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-section-hourly-dialog',
  templateUrl: './section-hourly-dialog.component.html',
  styleUrl: './section-hourly-dialog.component.css'
})

export class SectionHourlyDialogComponent implements OnInit {

  public chartOptions: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  const dataset = this.data.allAreas;

  // Ensure hours range from 13 to 23
  const groundData = this.padHours(dataset.groundFloor, 13, 23);
  const perfumeData = this.padHours(dataset.perfume, 13, 23);
  const counterData = this.padHours(dataset.counterArea, 13, 23);

  const hours = groundData.map(x => `${x.hourOfDay}:00`);
  const ground = groundData.map(x => x.visitCount);
  const perfume = perfumeData.map(x => x.visitCount);
  const counter = counterData.map(x => x.visitCount);

  this.chartOptions = {
    series: [
      { name: "Ground Floor", type: "line", data: ground },
      { name: "Perfume Section", type: "line", data: perfume },
      { name: "Counter Area", type: "line", data: counter }
    ],
    chart: {
      type: "line",
      height: 320,
      toolbar: { show: false },
      padding: { top: 20, right: 35, bottom: 15, left: 45 }
    },
    stroke: { curve: "smooth", width: 3 },
    colors: ["#007bff", "#ff4081", "#00c853"],
    xaxis: { categories: hours },
    markers: { size: 4 },
    tooltip: { shared: true }
  };
}

  private padHours(data: any[], startHour: number, endHour: number) {
    const hourMap = new Map(data.map(x => [x.hourOfDay, x.visitCount]));
    const result = [];
    for (let h = startHour; h <= endHour; h++) {
      result.push({ hourOfDay: h, visitCount: hourMap.get(h) ?? 0 });
    }
    return result;
  }
}

