import { Component } from '@angular/core';
@Component({
  selector: 'app-statistics-chart',
  templateUrl: './statistics-chart.component.html',
  styleUrl: './statistics-chart.component.css'
})
export class StatisticsChartComponent {
  statistics = [
    { label: 'Visitor', value: 30, icon: 'person' },
    { label: 'Tenant', value: 50, icon: 'person' },
    { label: 'Employees', value: 70, icon: 'person' },
    { label: 'Executives', value: 90, icon: 'person' }
  ];

  maxValue: number;

  constructor() {
    this.maxValue = Math.max(...this.statistics.map(stat => stat.value));
  }

  getProgressWidth(value: number): string {
    return `${(value / this.maxValue) * 100}%`;
  }

  getColor(value: number): string {
    if (value === this.maxValue) return '#4CAF50'; // Green for highest value
    else if (value >= this.maxValue / 2) return '#FF9800'; // Orange for mid-range
    else return '#2196F3'; // Blue for lowest values
  }
}