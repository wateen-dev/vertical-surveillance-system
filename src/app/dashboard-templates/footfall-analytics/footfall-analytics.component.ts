import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { EmployeeRegistrationService } from '../../employeeregistration/service/employeeregistrationservice';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-footfall-analytics',
  templateUrl: './footfall-analytics.component.html',
  styleUrls: ['./footfall-analytics.component.css']
})
export class FootfallAnalyticsComponent implements OnInit, OnDestroy {
  Highcharts = Highcharts;
  chartId1 = 'barChart';
  chartInstance: Highcharts.Chart | null = null;
  chartInitialized = false; // Flag to prevent re-initialization

  private destroy$ = new Subject<void>(); // Lifecycle management

  barChartOptions: Highcharts.Options = {
    chart: {
      type: 'column', // Bar chart
      height: 340,
    },
    title: {
      text: '',
      align: 'left',
      style: { fontSize: '18px' },
    },
    xAxis: {
      categories: [], // Time intervals (will be dynamically set)
      title: { text: 'Time' },
    },
    yAxis: {
      title: { text: 'Footfall' },
    },
    series: [
      {
        name: 'Footfall',
        type: 'column',
        data: [], // Footfall data (will be dynamically set)
        color: '#007BFF',
      },
    ],
    credits: { enabled: false },
  };

  staticData = {
    categories: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM'], // Static time intervals
    seriesData: [10, 20, 15, 30, 25], // Static footfall data
  };

  constructor(private analyticsService: EmployeeRegistrationService) {}

  ngOnInit(): void {
    // Fetch chart data on init
    this.fetchChartData();
  }

  fetchChartData(): void {
    this.analyticsService
      .getEmployeeCheckIns()
      .pipe(takeUntil(this.destroy$)) // Clean up subscription on destroy
      .subscribe(
        (data) => {
          // Check if data exists and has content
          const hasData = Array.isArray(data) && data.length > 0;

          const categories = hasData
            ? data.map((item: any) => this.formatTime(item.key)) // Format time intervals
            : this.staticData.categories;
          const seriesData = hasData
            ? data.map((item: any) => item.value) // Footfall counts
            : this.staticData.seriesData;

          if (!this.chartInitialized) {
            // Initialize chart if it's not already initialized
            this.chartInstance = Highcharts.chart(this.chartId1, this.barChartOptions);
            this.chartInitialized = true;
            this.updateChart(categories, seriesData);
          } else {
            // Update chart with new or fallback data if already initialized
            this.updateChart(categories, seriesData);
          }
        },
        (error) => {
          console.error('Error fetching data:', error);

          // Handle error by showing static data
          if (!this.chartInitialized) {
            this.chartInstance = Highcharts.chart(this.chartId1, this.barChartOptions);
            this.chartInitialized = true;
          }
          this.updateChart(this.staticData.categories, this.staticData.seriesData);
        }
      );
  }

  formatTime(timeSpan: string): string {
    // Format TimeSpan to 'HH:MM AM/PM'
    const [hours, minutes] = timeSpan.split(':').map(Number);
    const isPM = hours >= 12;
    const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;
  }

  updateChart(categories: string[] = [], seriesData: number[] = []): void {
    if (this.chartInstance) {
      // Update the existing chart's data and categories
      this.chartInstance.series[0].setData(seriesData);
      this.chartInstance.xAxis[0].setCategories(categories);
    }
  }

  ngOnDestroy(): void {
    // Clean up subscriptions and handle chart destruction if necessary
    if (this.chartInstance) {
      try {
        this.chartInstance.destroy();
      } catch (error) {
        console.warn('Error destroying chart:', error);
      }
      this.chartInstance = null;
    }
    this.destroy$.next(); // Emit the value to trigger the subscription cleanup
    this.destroy$.complete(); // Complete the subject
    console.log('FootfallComponent destroyed');
  }
}
