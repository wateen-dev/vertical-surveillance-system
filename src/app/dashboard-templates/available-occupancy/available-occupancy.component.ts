import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import Highcharts from 'highcharts';

export interface Tenant {
  completion: string;
  floor: string;
}

const ELEMENT_DATA: Tenant[] = [
  { completion: '10%', floor: 'Floor 4' },
  { completion: '80%', floor: 'Floor 6' },
  { completion: '90%', floor: 'Floor 9' },
  { completion: '35%', floor: 'Floor 1' },
  { completion: '55%', floor: 'Floor 3' },
  { completion: '100%', floor: 'Floor 5' },
];
@Component({
  selector: 'app-available-occupancy',
  templateUrl: './available-occupancy.component.html',
  styleUrl: './available-occupancy.component.css'
})
export class AvailableOccupancyComponent  {
 Highcharts = Highcharts;
   showExportInfo = false;
   dataSource = [
     { name: 'GF', y: 230, color: '#4CAF50' },
     { name: 'Floor 0', y: 122, color: '#2196F3' },
     { name: 'Floor 1', y: 15, color: 'blue' },
     { name: 'Floor 2', y: 15, color: 'purple' },
     { name: 'Floor 3', y: 15, color: 'green' },
     { name: 'Floor 4', y: 15, color: 'yellow' },
     { name: 'Floor 5', y: 15, color: 'grey' },
     { name: 'Floor 6', y: 15, color: 'pink' },
     { name: 'Floor 7', y: 15, color: 'brown' },
     { name: 'Floor 8', y: 15, color: 'red' },
     { name: 'Floor 9', y: 15, color: 'white' },
    
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
       
         dataLabels: {
           enabled: false,
         },
         showInLegend: true,
       },
     },
     series: [
       {
         type: 'pie',
         name: 'Value',
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
 