import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { StatisticsService } from '../../dashboard/services/statisticsService';
import { FootfallAnalyticsComponent } from '../footfall-analytics/footfall-analytics.component';
import { Subject, takeUntil } from 'rxjs';
import Highcharts from 'highcharts';

@Component({
  selector: 'app-statistics-chart',
  templateUrl: './statistics-chart.component.html',
  styleUrls: ['./statistics-chart.component.css'],
})
export class StatisticsChartComponent  {
  @ViewChild(FootfallAnalyticsComponent, { static: false }) footfallComponent!: FootfallAnalyticsComponent;
  showFootfall = true;
  private destroy$ = new Subject<void>(); // Lifecycle management
  Highcharts = Highcharts;
  chartId1 = 'lineChart';
  chartInstance: Highcharts.Chart | null = null;
  statistics: any[] = [];
  maxValue: number = 0;
  navigationSubscription: any;
lineChartOptions: Highcharts.Options = {
    chart: {
      type: 'areaspline',
      height: 340,
    },
    title: {
      text: 'Footfall Analytics',
      align: 'left',
      style: { fontSize: '18px' },
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      title: { text: 'Footfall' },
    },
    series: [
      {
        name: 'Footfall',
        type: 'areaspline',
        data: [],
        color: '#007BFF',
      },
    ],
    credits: { enabled: false },
  };

  staticData = {
    categories: ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'],
    seriesData: [25, 40, 35, 60, 45],
  };
  constructor(
    private statisticsService: StatisticsService,
    private router: Router
  ) {}

  fetchChartData(): void {
    this.statisticsService
      .getEmployeeCheckIns()
      .pipe(takeUntil(this.destroy$)) // Clean up subscription on destroy
      .subscribe(
        (data) => {
          // Map API response keys to chart categories and data
          const categories = data?.map((item: any) => item.key) || this.staticData.categories;
          const seriesData = data?.map((item: any) => item.value) || this.staticData.seriesData;
  
          // Update chart options
          if (this.lineChartOptions.xAxis && !Array.isArray(this.lineChartOptions.xAxis)) {
            this.lineChartOptions.xAxis.categories = categories;
          }
          if (this.lineChartOptions.series && this.lineChartOptions.series[0]) {
            const series = this.lineChartOptions.series[0] as Highcharts.SeriesAreasplineOptions;
            series.data = seriesData;
          }
  
          // Safely re-create the chart
          if (this.chartInstance) {
            this.chartInstance.destroy();
          }
          this.chartInstance = Highcharts.chart(this.chartId1, this.lineChartOptions);
        },
        (error) => {
          console.error('Error fetching data:', error);
  
          // Use fallback data on error
          if (this.lineChartOptions.xAxis && !Array.isArray(this.lineChartOptions.xAxis)) {
            this.lineChartOptions.xAxis.categories = this.staticData.categories;
          }
          if (this.lineChartOptions.series && this.lineChartOptions.series[0]) {
            const series = this.lineChartOptions.series[0] as Highcharts.SeriesAreasplineOptions;
            series.data = this.staticData.seriesData;
          }
  
          if (this.chartInstance) {
            this.chartInstance.destroy();
          }
          this.chartInstance = Highcharts.chart(this.chartId1, this.lineChartOptions);
        }
      );
  }
  
  ngOnInit(): void {
    
    this.loadStatistics();
    // Subscribe to router events to listen for navigation
    
  }
  getCardStyle(index: number): any {
    const styles = [
      { borderColor: 'rgb(35, 64, 255)', boxShadow: 'rgb(35, 64, 255) 0px 4px 8px 0px' },
      { borderColor: 'rgb(0, 150, 136)', boxShadow: 'rgb(0, 150, 136) 0px 4px 8px 0px' },
      { borderColor: 'rgb(233, 30, 99)', boxShadow: 'rgb(233, 30, 99) 0px 4px 8px 0px' }
    ];
    
    return styles[index % styles.length]; // Cycle through styles dynamically
  }
 

  loadStatistics(): void {
    this.statisticsService.getStatistics().subscribe((data) => {
      this.statistics = [
        { label: 'Employees', value: data.employee, icon: 'person' },
        { label: 'Executives', value: data.tenant, icon: 'person' },
        { label: 'Visitors', value: data.visitor, icon: 'person' },
      ];

      this.maxValue = Math.max(...this.statistics.map((stat) => stat.value));
    });
  }

  navigateToDetails(cardName: string): void {
    // this.chartInstance?.destroy();
    // this.chartInstance = null;
   
    this.router.navigate(['/vertical-surveillances-system'], {
      queryParams: { card: cardName },
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

  getIcon(): string {
    return 'person'; // Common user icon for all cards
  }

  // Cleanup FootfallAnalyticsComponent (destroy the chart)
  cleanupFootfallAnalytics(): void {
    if (this.footfallComponent) {
   
    }
    this.showFootfall = false; // Remove component from the view
  }
}
