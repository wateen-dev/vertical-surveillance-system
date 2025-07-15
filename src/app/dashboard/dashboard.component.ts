import { Component, ViewChild } from '@angular/core';
import { StatisticsChartComponent } from '../dashboard-templates/statistics-chart/statistics-chart.component';
import { FootfallAnalyticsComponent } from '../dashboard-templates/footfall-analytics/footfall-analytics.component';
import { DiningtableComponent } from '../dashboard-templates/diningtable/diningtable.component';
import { CakesbakesComponent } from '../dashboard-templates/cakesbakes/cakesbakes.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  @ViewChild(StatisticsChartComponent) statisticsChartComponent: StatisticsChartComponent | undefined;
  @ViewChild(FootfallAnalyticsComponent) footfallAnalyticsComponent: FootfallAnalyticsComponent | undefined;
  @ViewChild(DiningtableComponent) diningChartComponent: DiningtableComponent | undefined;
  @ViewChild(CakesbakesComponent) cakesbakesChartComponent: CakesbakesComponent | undefined;
  lastSyncedTime: string = '';

  constructor() {
    this.updateLastSyncedTime();
  }
  ngOnInit(): void {
    this.refreshDashboard();
  }
  // Update the "last synced" time
  updateLastSyncedTime(): void {
    const now = new Date();
    this.lastSyncedTime = `${now.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  // Refresh the dashboard
  refreshDashboard(): void {
    // Logic to refresh all components
    this.refreshComponents();

    // Update the last synced time
    this.updateLastSyncedTime();
  }

  // Logic to refresh child components
  // refreshComponents(): void {
  //   if (this.statisticsChartComponent) {
  //     this.statisticsChartComponent.loadStatistics();
  //     // this.footfallAnalyticsComponent?.fetchChartData();
  //   }

  //   // Update the last synced time
  //   this.updateLastSyncedTime();
  // }

    refreshComponents(): void {
    if (this.diningChartComponent) {
      this.diningChartComponent.loadStatistics();
      // this.footfallAnalyticsComponent?.fetchChartData();
    }
    if (this.cakesbakesChartComponent) {
      this.cakesbakesChartComponent.loadCashierStatistics();
      // this.footfallAnalyticsComponent?.fetchChartData();
    }

    // Update the last synced time
    this.updateLastSyncedTime();
  }
}
