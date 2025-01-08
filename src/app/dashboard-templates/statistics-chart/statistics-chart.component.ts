import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../dashboard/services/statisticsService';


@Component({
  selector: 'app-statistics-chart',
  templateUrl: './statistics-chart.component.html',
  styleUrls: ['./statistics-chart.component.css'],
})
export class StatisticsChartComponent implements OnInit {
  statistics: any[] = [];
  maxValue: number = 0;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.statisticsService.getStatistics().subscribe((data) => {
      this.statistics = [
        { label: 'Visitor', value: data.visitor, icon: 'person' },
        { label: 'Tenant', value: data.tenant, icon: 'person' },
        { label: 'Employees', value: data.employee, icon: 'person' },
      ];

      this.maxValue = Math.max(...this.statistics.map((stat) => stat.value));
    });
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
