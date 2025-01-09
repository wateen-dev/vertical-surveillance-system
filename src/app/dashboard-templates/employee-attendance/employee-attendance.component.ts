import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.css'],
})
export class EmployeeAttendanceComponent {
  highcharts = Highcharts;
  chartOptions: any;

  totalEmployees: number = 9; // Total number of employees
  presentEmployees: number = 8; // Number of employees present
  attendancePercentage: number = Math.round((this.presentEmployees / this.totalEmployees) * 100); // Round off the present percentage
  absentPercentage: number = Math.round(((this.totalEmployees - this.presentEmployees) / this.totalEmployees) * 100); // Round off the absent percentage

  constructor() {
    this.chartOptions = {
      chart: {
        type: 'pie',
        marginTop: 40, // Space for the title
      },
      title: {
        text: 'Staff Attendance',
        align: 'left', // Align title to the left
        x: 0, // Horizontal position adjustment
        y:10,
        
        style: {
          fontSize: '18px', // Customize title font size
          fontWeight: 'normal',
          fontFamily: 'Century Gothic, sans-serif', // Add Century Gothic font
        },
      },
      tooltip: {
        pointFormat: '{point.name}: {point.percentage:.1f}%', // Only show percentage of present/absent employees
        enabled: true,
      },
      plotOptions: {
        pie: {
          innerSize: '75%', // Donut effect
          dataLabels: {
            enabled: true, // Show percentage in the center
            format: '{y}%', // Display percentage value
            style: {
              fontWeight: 'bold',
              color: 'black',
              fontSize: '18px',
            },
          },
          borderWidth: 0, // Removes the border of the donut chart
        },
      },
      series: [
        {
          name: 'Attendance',
          colorByPoint: true,
          data: [
            {
              name: 'Present',
              y: this.attendancePercentage, // Dynamic present percentage
              color: '#4CAF50', // Green color for present employees
            },
            {
              name: 'Absent',
              y: this.absentPercentage, // Dynamic absent percentage
              color: '#F44336', // Red color for absent employees
            },
          ],
        },
      ],
    };
  }
}
