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
  presentEmployees: number = 7; // Number of employees present (example)
  attendancePercentage: number = Math.round((this.presentEmployees / this.totalEmployees) * 100); // Rounded percentage of present
  absentPercentage: number = Math.round(((this.totalEmployees - this.presentEmployees) / this.totalEmployees) * 100); // Rounded percentage of absent

  constructor() {
    this.chartOptions = {
      chart: {
        type: 'pie',
         // Optional: make the chart background transparent
        marginTop: 20,
        marginBottom: -120, // Adjust margin for the half-donut effect
      },
      title: {
        text: 'Staff Attendance',
        align: 'center', // Center the title
        style: {
          fontSize: '20px',
          fontWeight: 'normal',
          fontFamily: 'Century Gothic, sans-serif',
        },
      },
      tooltip: {
        pointFormat: '{point.name}: {point.percentage:.1f}%',
      },
      plotOptions: {
        pie: {
          startAngle: -90, // Begin at the top
          endAngle: 90, // End at the bottom for half-donut
          innerSize: '75%', // Creates the donut effect
          center: ['50%', '70%'], // Adjust the center for a larger and centered chart
          dataLabels: {
            enabled: true,
            format: '{y}%',
            style: {
              fontWeight: 'bold',
              color: 'black',
              fontSize: '16px',
            },
          },
        },
      },
      series: [
        {
          name: 'Attendance',
          colorByPoint: true,
          data: [
            {
              name: 'Present',
              y: this.attendancePercentage,
              color: '#4CAF50', // Green color
            },
            {
              name: 'Absent',
              y: this.absentPercentage,
              color: '#F44336', // Red color
            },
          ],
        },
      ],
    };
  }
}
