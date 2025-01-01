import { Component } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-footfall-analytics',
  templateUrl: './footfall-analytics.component.html',
  styleUrl: './footfall-analytics.component.css'
})
export class FootfallAnalyticsComponent {
  Highcharts = Highcharts; // Highcharts namespace
  chartId1 = 'lineChart';
  
  // Line Chart Options
  lineChartOptions: Highcharts.Options = {
    chart: {
      type: 'areaspline', // Smooth area chart
      // backgroundColor: '#cac9c9', // Optional: Set background color
    },
    title: {
      text: 'Footfall Analytics', // Main title
      align: 'left', // Align title to the left
      x: 0, // Horizontal position adjustment
      y:30,
      margin:38,
      style: {
        fontSize: '18px', // Customize title font size
        fontWeight: 'normal',
        fontFamily: 'Century Gothic, sans-serif', // Add Century Gothic font
      },
    },
    subtitle: {
      text: 'All Floors', // Smaller subtitle
      align: 'left', // Align subtitle to the left
      x: 0, // Horizontal position adjustment
      y: 55, // Move below the main title
      style: {
        fontSize: '12px', // Customize subtitle font size
        color: '#666666', // Subtitle color
        fontweigh: 'bold',
        fontFamily: 'Century Gothic, sans-serif', // Add Century Gothic font
      },
    },
    xAxis: {
      categories: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00'],
      gridLineWidth: 0, // Hide horizontal grid lines
      tickWidth: 0, // Hide tick marks on the X-axis
      lineWidth: 0, // Hide the X-axis line
    },
    yAxis: {

      lineColor: '#666666', // Y-axis line color
      title: {
        text: 'Footfall',
      },
      plotLines: [
        {
          value: 0, // Y-axis base line
          width: 1, // Line width
          color: '#666666', // Line color
          dashStyle: 'Dash', // Dotted line style
        },
      ],
    },
    series: [
      {
        name: 'Footfall',
        type: 'areaspline',
        data: [100, 200, 150, 300, 250, 400],
        color: '#007BFF', // Line color
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, // Gradient effect
          stops: [
            [0, '#007BFF'], // Solid blue at the top
            [1, 'rgba(0, 123, 255, 0)'], // Transparent at the bottom
          ],
        },
      },
    ],
    credits: {
      enabled: false, // Remove Highcharts watermark
    },
  };
}
