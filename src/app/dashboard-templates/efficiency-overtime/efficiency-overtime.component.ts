import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { EmployeeRegistrationService } from '../../employeeregistration/service/employeeregistrationservice';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-efficiency-overtime',
  templateUrl: './efficiency-overtime.component.html',
  styleUrls: ['./efficiency-overtime.component.css']
})
export class EfficiencyOvertimeComponent implements OnInit, OnDestroy {
  Highcharts = Highcharts;
  chartId1 = 'lineChart';
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
     
      style: { fontSize: '18px', },
    },
    xAxis: {
      categories: [],
      title: { text: 'Time' },
    },
    yAxis: {
      title: { text: 'Duration (minutes)' },
    },
    series: [
      {
        name: 'Duration',
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
    this.analyticsService.getefficiencyOvertime()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any[]) => {
          if (data && data.length) {
            this.employeeData = data;
            this.employeeNames = [...new Set(data.map(item => item.employeeName))];
            this.selectedEmployee = this.employeeNames[0];
            this.updateChartForEmployee(this.selectedEmployee);
          } else {
            this.setDummyData();
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
          this.setDummyData();
        }
      );
  }
  
  setDummyData(): void {
    this.employeeData = [
      { employeeName: 'Maheen', time: '08:00', duration: '00:45:00' },
      { employeeName: 'Maheen', time: '10:00', duration: '01:30:00' },
      { employeeName: 'Maheen', time: '14:00', duration: '00:55:00' }
    ];
    this.employeeNames = ['Maheen'];
    this.selectedEmployee = 'Maheen';
    this.updateChartForEmployee(this.selectedEmployee);
  }
  updateChartForEmployee(employeeName: string): void {
    // Filter data for the selected employee
    const filteredData = this.employeeData.filter(item => item.employeeName === employeeName);
  
    // Group by minute (ignoring seconds)
    const groupedData: { [key: string]: number } = {};
  
    filteredData.forEach(item => {
      const timeKey = this.formatTimeTo12Hour(item.time); // Format time to HH:mm AM/PM
      const durationParts = item.duration.split(':').map(Number);
      const durationInMinutes = durationParts[0] * 60 + durationParts[1] + durationParts[2] / 60; // Convert to minutes
  
      if (!groupedData[timeKey]) {
        groupedData[timeKey] = 0;
      }
      groupedData[timeKey] += durationInMinutes;
    });
  
    // Convert grouped data into arrays for chart
    const categories = Object.keys(groupedData);
    const seriesData = Object.values(groupedData);
  
    if (!this.chartInitialized) {
      this.chartInstance = Highcharts.chart(this.chartId1, this.lineChartOptions);
      this.chartInitialized = true;
    }
  
    if (this.chartInstance) {
      this.chartInstance.series[0].setData(seriesData);
      this.chartInstance.xAxis[0].setCategories(categories);
    }
  }
  
  // Helper function to format time in 12-hour format
  formatTimeTo12Hour(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 or 12 to 12 AM/PM
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
  
  
  formatTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const isPM = hours >= 12;
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;
  }

  getDurationInMinutes(duration: string): number {
    const [hours, minutes] = duration.split(':').map(Number);
    return hours * 60 + minutes;
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
