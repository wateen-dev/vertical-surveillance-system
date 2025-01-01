import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-visitor-analytics',
  templateUrl: './visitor-analytics.component.html',
  styleUrls: ['./visitor-analytics.component.css']
})
export class VisitorAnalyticsComponent {
  Highcharts = Highcharts;
  showExportInfo = false;
  dataSource = [
    { name: 'Male', y: 230, color: '#4CAF50' },
    { name: 'Female', y: 122, color: '#2196F3' },
    { name: 'Anomalies', y: 15, color: '#FFC107' },
    { name: 'Access Denied', y: 190, color: '#F44336' },
    { name: 'Alarms', y: 32, color: '#9C27B0' },
    { name: 'Guests', y: 28, color: '#00BCD4' },
  ];

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
        innerSize: '80%',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Visitor Categories',
        data: this.dataSource.map((item) => ({
          name: item.name,
          y: item.y,
          color: item.color,
        })), // Maps the dataSource to Highcharts series format
      },
    ],
  };

  toggleExportInfo() {
    this.showExportInfo = !this.showExportInfo;
  }
  exportAsCsv() {
    const dataToExport = this.dataSource.map((item) => ({
      Category: item.name,
      Value: item.y,
      Color: item.color,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ChartData.xlsx';
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
