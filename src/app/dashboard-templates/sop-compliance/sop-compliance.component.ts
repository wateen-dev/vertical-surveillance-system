import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { EmployeeRegistrationService } from '../../employeeregistration/service/employeeregistrationservice';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sop-compliance',
  templateUrl: './sop-compliance.component.html',
  styleUrls: ['./sop-compliance.component.css']
})
export class SopComplianceComponent implements OnInit, OnDestroy {
  Highcharts = Highcharts;
  chartId1 = 'lineChart1';
  chartInstance: Highcharts.Chart | null = null;
  chartInitialized = false;

  private destroy$ = new Subject<void>();

  employeeNames: string[] = ['Faliha', 'Wali']; // Predefined employee names
  selectedEmployee: string = 'Faliha'; // Default selected employee

  staticData = {
    categories: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM'],
    seriesData: {
      Faliha: [85, 90, 95, 80, 70],
      Wali: [75, 80, 85, 70, 65],
    },
  };

  lineChartOptions: Highcharts.Options = {
    chart: {
      type: 'line',
      height: 340,
    },
    title: {
      text: '',
      align: 'left',
      style: { fontSize: '18px' },
    },
    xAxis: {
      categories: [],
      title: { text: 'Time' },
    },
    yAxis: {
      title: { text: 'Percentage' },
      min: 0,
      max: 100,
      tickInterval: 10,
    },
    series: [
      {
        name: 'Compliance Percentage',
        type: 'line',
        data: [],
        color: '#007BFF',
      },
    ],
    credits: { enabled: false },
  };

  constructor(private analyticsService: EmployeeRegistrationService) {}

  ngOnInit(): void {
    // Initialize the chart with the default selected employee data
    this.updateChartForEmployee(this.selectedEmployee);
  }

  updateChartForEmployee(employeeName: string): void {
    // Get the data for the selected employee
    const categories = this.staticData.categories;
    const seriesData = this.staticData.seriesData[employeeName as keyof typeof this.staticData.seriesData];

    if (!this.chartInitialized) {
      // Initialize the chart only if it hasn't been initialized already
      this.chartInstance = Highcharts.chart(this.chartId1, this.lineChartOptions);
      this.chartInitialized = true;
    }

    if (this.chartInstance) {
      // Clear the existing data
      this.chartInstance.series[0].setData([], true); // Clear existing data without redrawing

      // Now update the chart with the new data
      this.chartInstance.series[0].setData(seriesData, true); // The second argument `true` redraws the chart
      this.chartInstance.xAxis[0].setCategories(categories);
    }
  }

  onEmployeeChange(): void {
    // Update the chart when a new employee is selected
    this.updateChartForEmployee(this.selectedEmployee);
  }

  ngOnDestroy(): void {
    // Cleanup chart and subscription
    if (this.chartInstance) {
      try {
        this.chartInstance.destroy();
      } catch (error) {
        console.warn('Error destroying chart:', error);
      }
      this.chartInstance = null;
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
}
