import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../dashboard/services/statisticsService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cakesbakes',
  templateUrl: './cakesbakes.component.html',
  styleUrl: './cakesbakes.component.css'
})
export class CakesbakesComponent {
  statistics: any[] = [];
  maxValue: number = 0;

  constructor(private statisticsService: StatisticsService,private router: Router) {}

  ngOnInit(): void {
    this.loadCashierStatistics();
  }
  
 loadCashierStatistics(): void {
  this.statisticsService.getCashierStatistics().subscribe({
    next: (data) => {
      if (data) {
        
        this.statistics = [
          { label: 'Employees', value: +data.employees, icon: 'groups' },
          { label: 'Total Visitors', value: +data.cashCounter, icon: 'point_of_sale' },
          { label: 'Ordering Queue', value: +data.orderPlacement, icon: 'playlist_add' },
          { label: 'Receiving Queue', value: +data.orderReceiving, icon: 'assignment_turned_in' },
          { label: 'Uniform Violations', value: +data.uniformViolations, icon: 'report_problem' }
      ];
      } else {
        this.setDefaultCashierStatistics();
      }

      this.maxValue = Math.max(...this.statistics.map((s) => s.value));
    },
    error: (error) => {
      console.error('API error:', error);
      this.setDefaultCashierStatistics();
      this.maxValue = Math.max(...this.statistics.map((s) => s.value));
    }
  });
}

private setDefaultCashierStatistics(): void {
  this.statistics = [
    { label: 'Employees', value: 1, icon: 'groups' },
    { label: 'Total Visitors', value: 2, icon: 'point_of_sale' },
    { label: 'Ordering Queue', value: 3, icon: 'playlist_add' },
    { label: 'Receiving Queue', value: 4, icon: 'assignment_turned_in' },
    { label: 'Uniform Violations', value: 5, icon: 'report_problem' }
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
    case 'Employees':
      return '#4CAF50'; // Green for team/people
    case 'Cash Counter':
      return '#3F51B5'; // Indigo for finance/tech
    case 'Order Placer':
      return '#009688'; // Teal for process flow
    case 'Order Receiver':
      return '#8BC34A'; // Light green for task complete
    case 'Uniform Violations':
      return '#F44336'; // Red for warnings/errors
    default:
      return '#2196F3'; // Default blue
  }
}
  
  getIcon(): string {
    return 'fire'; // Common user icon for all cards
  }
}
