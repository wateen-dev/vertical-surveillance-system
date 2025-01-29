import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import Highcharts from 'highcharts';

@Component({
  selector: 'app-available-occupancy',
  templateUrl: './available-occupancy.component.html',
  styleUrls: ['./available-occupancy.component.css'],
})
export class AvailableOccupancyComponent implements OnInit {
  Highcharts = Highcharts;
  showExportInfo = false;

  floorData = [
    { name: 'GF', covered: 75, color: '#4CAF50' },
    { name: 'Floor 1', covered: 60, color: '#2196F3' },
    { name: 'Floor 2', covered: 45, color: '#FF9800' },
    { name: 'Floor 3', covered: 30, color: '#9C27B0' },
    { name: 'Floor 4', covered: 90, color: '#F44336' },
    { name: 'Floor 5', covered: 55, color: '#8BC34A' },
    { name: 'Floor 6', covered: 80, color: '#00BCD4' },
    { name: 'Floor 7', covered: 50, color: '#E91E63' },
    { name: 'Floor 8', covered: 65, color: '#3F51B5' },
    { name: 'Floor 9', covered: 40, color: '#FFEB3B' },
  ];

  floorDataGroups: any[] = [];

  totalSpace = 100 * this.floorData.length;
  totalCovered = this.floorData.reduce((sum, floor) => sum + floor.covered, 0);
  totalFree = this.totalSpace - this.totalCovered;

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: '#ffffff',
      marginTop: -10,
    },
    title: {
      text: '',
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: '{point.percentage:.1f} %',
        },
        showInLegend: true,
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Building Utilization',
        data: [
          { name: 'Covered Space', y: this.totalCovered, color: '#4CAF50' },
          { name: 'Free Space', y: this.totalFree, color: '#2196F3' },
        ],
      },
    ],
  };

  ngOnInit() {
    this.groupFloorData();
  }

  groupFloorData() {
    const groupSize = Math.ceil(this.floorData.length / 2); // Split into two columns
    this.floorDataGroups = [];

    for (let i = 0; i < this.floorData.length; i += groupSize) {
      this.floorDataGroups.push(this.floorData.slice(i, i + groupSize));
    }
  }

  toggleExportInfo() {
    this.showExportInfo = !this.showExportInfo;
  }

  exportAsCsv() {
    const dataToExport = this.floorData.map((floor) => ({
      Floor: floor.name,
      'Covered Space (%)': floor.covered,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'FloorData.xlsx';
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
