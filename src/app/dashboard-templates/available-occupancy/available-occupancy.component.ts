import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

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
export class AvailableOccupancyComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['floor', 'completion'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  showExportInfo = false;
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  toggleExportInfo() {
    this.showExportInfo = !this.showExportInfo;
  }

  exportAsCsv() {
    const data = this.dataSource.data;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'AvailableOccupancyReport.xlsx';
    link.click();
    window.URL.revokeObjectURL(url);
  }
  getProgressWidth(value: number): string {
    const maxProgress = 100; // Define the maximum value for the progress bar
    const widthPercentage = Math.min(value, maxProgress); // Ensures the width doesn't exceed 100%
    return `${widthPercentage}%`;
}
  getNumericCompletion(value: string): number {
    // Safely convert the percentage string to a number
    return value ? parseInt(value.replace('%', '').trim(), 10) : 0;
  }

  getColor(value: string): string {
    const numericValue = this.getNumericCompletion(value);

    if (numericValue < 33) {
      return 'red';
    } else if (numericValue < 66) {
      return 'orange';
    } else {
      return 'green';
    }
  }

}
