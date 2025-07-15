import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../dashboard/services/statisticsService';
import { Router } from '@angular/router';
@Component({
  selector: 'app-diningtable',
  templateUrl: './diningtable.component.html',
  styleUrl: './diningtable.component.css'
})
export class DiningtableComponent {
  statistics: any[] = [];
  maxValue: number = 0;

  constructor(private statisticsService: StatisticsService,private router: Router) {}

  ngOnInit(): void {
    this.loadStatistics();
  }
  
    loadStatistics(): void {
    this.statisticsService.getDiningStatistics().subscribe({
      next: (data) => {
        if (data) {
          
          this.statistics = [
            { label: 'Cleanliness Violations', value: +data.cleanlinessCount, icon: 'cleaning_services' },
            { label: 'Vacant Tables', value: +data.vacantTable, icon: 'event_seat' },
            { label: 'Occupied Tables', value: +data.occupiedTable, icon: 'table_restaurant' },
            { label: 'Avg Cleanliness Time', value: +data.avgTableCleanliness, icon: 'schedule' },
            { label: 'Avg Occupied Time', value: +data.avgTableOccupiedTime, icon: 'timer' }
          ];
        } else {
          this.setDefaultStatistics();
        }

        this.maxValue = Math.max(...this.statistics.map((s) => s.value));
      },
      error: (error) => {
        console.error('API call failed:', error);
        this.setDefaultStatistics();
        this.maxValue = Math.max(...this.statistics.map((s) => s.value));
      }
    });
  }

  private setDefaultStatistics(): void {
    this.statistics = [
      { label: 'Cleanliness Violations', value: 3, icon: 'cleaning_services' },
      { label: 'Vacant Tables', value: 4, icon: 'event_seat' },
      { label: 'Occupied Tables', value: 3, icon: 'table_restaurant' },
      { label: 'Avg Cleanliness Time', value: 4, icon: 'schedule' },
      { label: 'Avg Occupied Time', value: 4, icon: 'timer' }
    ];
  }

  getProgressWidth(value: number): string {
    return `${(value / this.maxValue) * 100}%`;
  }
  navigateToDetails(){
    this.router.navigate(['/vertical-surveillances-system']);
  }
getColor(label: string): string {
  switch (label) {
    case 'Cleanliness Violations':
      return '#E91E63'; // Pink-red for hygiene issues
    case 'Vacant Tables':
      return '#607D8B'; // Cool grey for empty
    case 'Occupied Tables':
      return '#795548'; // Brown for warmth/dining
    case 'Avg Cleanliness Time':
      return '#00BCD4'; // Cyan for cleanliness metric
    case 'Avg Occupied Time':
      return '#9C27B0'; // Purple for time analytics
    default:
      return '#2196F3'; // Default blue
  }
}
  
  getIcon(): string {
    return 'fire'; // Common user icon for all cards
  }
}
