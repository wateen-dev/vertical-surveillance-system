import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


export interface Tenant {
  logo: string;
  company: string;
  tenant: number;
  floor: string;
}
const ELEMENT_DATA: Tenant[] = [
  { logo: 'apartment', company: 'The Vertical', tenant: 8, floor: 'Floor 0' },
  { logo: 'landscape', company: 'wateen', tenant: 9, floor: 'Floor 1' },
  { logo: 'waves', company: 'Abyss', tenant: 210, floor: 'Floor 9' },
  { logo: 'hub', company: 'Node 7', tenant: 165, floor: 'Floor 1' },
  { logo: 'developer_board', company: 'Terate', tenant: 184, floor: 'Floor 3' },
  { logo: 'security', company: 'Fortsity', tenant: 110, floor: 'Floor 5' },
];

@Component({
  selector: 'app-tenant-grid',
  templateUrl: './tenant-grid.component.html',
  styleUrls: ['./tenant-grid.component.css']
})
export class TenantGridComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['company', 'tenant', 'floor','leaseStart','leaseEnd'];
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
    link.download = 'TenantReport.xlsx';
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
