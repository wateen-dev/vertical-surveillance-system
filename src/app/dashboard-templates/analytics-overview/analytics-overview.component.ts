import { Component, OnInit } from '@angular/core';
import { AnalyticsCard, ViolationService } from '../services/violation.service';
@Component({
  selector: 'app-analytics-overview',
  templateUrl: './analytics-overview.component.html',
  styleUrl: './analytics-overview.component.css'
})
export class AnalyticsOverviewComponent implements OnInit {
analyticsData: Record<string, AnalyticsCard> | null = null;
  loading = true;

  constructor(private violationService: ViolationService) {}

  ngOnInit(): void {
    this.violationService.getAnalytics().subscribe(data => {
      this.analyticsData = data;
      this.loading = false;
    });
  }
}