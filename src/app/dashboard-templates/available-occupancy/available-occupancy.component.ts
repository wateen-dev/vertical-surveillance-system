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
  selectedCity: string = '';
  selectedBranch: string = '';

  cities = ['Lahore', 'Islamabad', 'Karachi'];
  branchesData: any = {
    'Lahore': ['DHA', 'Gulberg', 'Johar Town'],
    'Islamabad': ['G-5', 'G-6', 'G-7'],
    'Karachi': ['Korangi Town', 'Gulberg Town', 'Gulshan Town'],
  };

  occupancyData: any = {
    'DHA': [
      { name: 'GF', covered: 75, color: '#4CAF50' },
      { name: 'Floor 1', covered: 60, color: '#2196F3' },
    ],
    'Gulberg': [
      { name: 'Floor 2', covered: 45, color: '#FF9800' },
      { name: 'Floor 3', covered: 30, color: '#9C27B0' },
    ],
    'Johar Town': [
      { name: 'Floor 4', covered: 90, color: '#F44336' },
      { name: 'Floor 5', covered: 55, color: '#8BC34A' },
    ],
    'G-5': [
      { name: 'Floor 4', covered: 90, color: '#F44336' },
      { name: 'Floor 5', covered: 55, color: '#8BC34A' },
    ],
    'G-6': [
      { name: 'Floor 4', covered: 90, color: '#F44336' },
      { name: 'Floor 5', covered: 55, color: '#8BC34A' },
    ],
    'G-7': [
      { name: 'Floor 4', covered: 90, color: '#F44336' },
      { name: 'Floor 5', covered: 55, color: '#8BC34A' },
    ],
    'Korangi Town': [
      { name: 'Floor 4', covered: 90, color: '#F44336' },
      { name: 'Floor 5', covered: 55, color: '#8BC34A' },
    ],
    'Gulberg Town': [
      { name: 'Floor 4', covered: 90, color: '#F44336' },
      { name: 'Floor 5', covered: 55, color: '#8BC34A' },
    ],
    'Gulshan Town': [
      { name: 'Floor 4', covered: 90, color: '#F44336' },
      { name: 'Floor 5', covered: 55, color: '#8BC34A' },
    ],
  };

  floorData: any[] = [];
  floorDataGroups: any[] = [];
  totalSpace = 0;
  totalCovered = 0;
  totalFree = 0;

  chartOptions: Highcharts.Options = {
    chart: { type: 'pie', backgroundColor: '#ffffff', marginTop: -10 },
    title: { text: '' },
    plotOptions: {
      pie: {
        dataLabels: { enabled: true, format: '{point.percentage:.1f} %' },
        showInLegend: true,
      },
    },
    series: [{ type: 'pie', name: 'Branches Utilization', data: [] }],
  };

  ngOnInit() { if (this.cities.length > 0) {
    this.selectedCity = this.cities[0]; // Select first city by default
    this.selectedBranch = this.branchesData[this.selectedCity][0]; // Select first branch of the first city by default
    this.onBranchChange(); // Load data for the selected branch
  }
}

onCityChange() {
  if (this.selectedCity && this.branchesData[this.selectedCity].length > 0) {
    this.selectedBranch = this.branchesData[this.selectedCity][0]; // Automatically select first branch
    this.onBranchChange(); // Update data accordingly
  }
}

  onBranchChange() {
    if (!this.selectedBranch) return; // Prevent errors when no branch is selected
    this.floorData = this.occupancyData[this.selectedBranch] || [];
    this.updateChart();
    this.groupFloorData();
  }

  groupFloorData() {
    const groupSize = Math.ceil(this.floorData.length / 2);
    this.floorDataGroups = [];
    for (let i = 0; i < this.floorData.length; i += groupSize) {
      this.floorDataGroups.push(this.floorData.slice(i, i + groupSize));
    }
  }

  updateChart() {
    this.totalSpace = 100 * this.floorData.length;
    this.totalCovered = this.floorData.reduce((sum, floor: any) => sum + floor.covered, 0);
    this.totalFree = this.totalSpace - this.totalCovered;

    this.chartOptions.series = [
      {
        type: 'pie',
        name: 'Branches Utilization',
        data: [
          { name: 'Covered Space', y: this.totalCovered, color: '#4CAF50' },
          { name: 'Free Space', y: this.totalFree, color: '#2196F3' },
        ],
      },
    ];

    // Force chart update
    setTimeout(() => {
      Highcharts.chart('container', this.chartOptions);
    }, 100);
  }

  toggleExportInfo() {
    this.showExportInfo = !this.showExportInfo;
  }

  exportAsCsv() {
    const dataToExport = this.floorData.map((floor: any) => ({ Floor: floor.name, 'Covered Space (%)': floor.covered }));
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
