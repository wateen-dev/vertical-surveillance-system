import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
export interface checkInLogs {
  id: string;
  access: boolean;
  checkInTime: string;
}
@Component({
  selector: 'app-verticalsurveillances-system',
  templateUrl: './verticalsurveillances-system.component.html',
  styleUrl: './verticalsurveillances-system.component.css'
})
export class VerticalsurveillancesSystemComponent {
  tenants: checkInLogs[] = [];
  displayedColumns: string[] = ['id', 'access', 'checkInTime'];
  dataSource = new MatTableDataSource<checkInLogs>();
  showExportInfo = false;
  private ELEMENT_DATA: checkInLogs[] = [
    { id: '21387', access: true, checkInTime: '04:40:23 PM' },
    { id: '21388', access: false, checkInTime: '04:35:10 PM' },
    { id: '21389', access: true, checkInTime: '04:30:15 PM' },
  ];
employee = {
  name: "John A. Smith",
  id: 21387,
  access: "Allowed",
  company: "Northface",
  floor: "7th",
  validTill: "12-08-2026",
  photoUrl: "assets/photo-logo.png",
};
ngOnInit(): void {
  this.dataSource.data = this.ELEMENT_DATA;
}

toggleExportInfo(): void {
  this.showExportInfo = !this.showExportInfo;
}

exportAsCsv(): void {
  console.log('Exporting as CSV...');
  // Implement CSV export logic here
}
}