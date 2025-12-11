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

  employeeNames: string[] = [];
  selectedEmployee: string = '';
  employeeData: any[] = []; // Holds API data for filtering

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
      title: { text: 'Compliance Percentage (%)' },
      min: 0,
      max: 100
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
    this.fetchChartData();
  }

  fetchChartData(): void {
    this.analyticsService
      .getSopCompliance()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any[]) => {
          if (data && data.length) {
            this.employeeData = data;
  
            // Extract unique employee names
            this.employeeNames = [...new Set(data.map(item => item.employeeName))];
  
            // Default to the first employee in the list
            this.selectedEmployee = this.employeeNames[0];
            this.updateChartForEmployee(this.selectedEmployee);
          } else {
            // Use dummy data when no API data is available
            this.setDummyData();
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
          this.setDummyData(); // Set dummy data on error
        }
      );
  }
  
  // Function to set dummy data
  setDummyData(): void {
    this.employeeData = [
      { employeeName: 'Wali', time: '08:00', totalPercentage: 75 },
      { employeeName: 'Wali', time: '12:00', totalPercentage: 80 },
      { employeeName: 'Wali', time: '16:00', totalPercentage: 85 }
    ];
  
    this.employeeNames = ['Wali'];
    this.selectedEmployee = 'Wali';
    this.updateChartForEmployee('Wali');
  }

  updateChartForEmployee(employeeName: string): void {
    // Filter data for the selected employee
    const filteredData = this.employeeData.filter(item => item.employeeName === employeeName);
  
    // Process data for chart
    const categories: string[] = [];
    const seriesData: number[] = [];
  
    filteredData.forEach(item => {
      const formattedTime = this.formatTimeTo12Hour(item.time); // Convert time format
      categories.push(formattedTime);
      seriesData.push(item.totalPercentage);
    });

    // Sort by time
    const sortedIndices = categories.map((_, i) => i)
      .sort((a, b) => this.compareTime(categories[a], categories[b]));
    
    const sortedCategories = sortedIndices.map(i => categories[i]);
    const sortedSeriesData = sortedIndices.map(i => seriesData[i]);

    if (!this.chartInitialized) {
      this.chartInstance = Highcharts.chart(this.chartId1, this.lineChartOptions);
      this.chartInitialized = true;
    }

    if (this.chartInstance) {
      this.chartInstance.series[0].setData(sortedSeriesData);
      this.chartInstance.xAxis[0].setCategories(sortedCategories);
    }
  }

  // Helper function to format time in 12-hour format
  formatTimeTo12Hour(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 or 12 to 12 AM/PM
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  compareTime(a: string, b: string): number {
    const parseTime = (t: string) => {
      const matches = t.match(/\d+|\w+/g) || [];
      const hour = parseInt(matches[0] || '0'); // Default to 0 if undefined
      const minute = parseInt(matches[1] || '0'); // Default to 0 if undefined
      const period = matches[2] || 'AM'; // Default to 'AM' if undefined
  
      const hours = (hour % 12) + (period.toUpperCase() === 'PM' ? 12 : 0);
      return hours * 60 + minute;
    };
  
    return parseTime(a) - parseTime(b);
  }
  

  onEmployeeChange(): void {
    this.updateChartForEmployee(this.selectedEmployee);
  }

  ngOnDestroy(): void {
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
