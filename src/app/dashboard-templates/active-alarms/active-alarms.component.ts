import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../dashboard/services/statisticsService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-active-alarms',
  templateUrl: './active-alarms.component.html',
  styleUrls: ['./active-alarms.component.css'],
})
export class ActiveAlarmsComponent implements OnInit {
  statistics: any[] = [];
  maxValue: number = 0;

  constructor(private statisticsService: StatisticsService,private router: Router) {}

  ngOnInit(): void {
    this.loadStatistics();
  }
  
  loadStatistics(): void {
   
      this.statistics = [
        { label: 'Fire Hazards', value: 2, icon: 'local_fire_department' },
        { label: 'SOP Violations', value: 3, icon: 'report_problem' },
        { label: 'Weapons', value: 4, icon: 'security' },
      ];

      this.maxValue = Math.max(...this.statistics.map((stat) => stat.value));
   
  }

  getProgressWidth(value: number): string {
    return `${(value / this.maxValue) * 100}%`;
  }
  navigateToDetails(){
    this.router.navigate(['/vertical-surveillances-system']);
  }
  getColor(label: string): string {
    switch (label) {
      case 'Fire Hazards':
        return '#FF5722'; // Red for fire hazards
      case 'SOP Violations':
        return '#FFC107'; // Yellow for SOP violations
      case 'Weapons':
        return '#9C27B0'; // Purple for weapons
      default:
        return '#2196F3'; // Default blue
    }
  }
  
  getIcon(): string {
    return 'fire'; // Common user icon for all cards
  }
}
