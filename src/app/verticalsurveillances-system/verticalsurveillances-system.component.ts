import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-verticalsurveillances-system',
  templateUrl: './verticalsurveillances-system.component.html',
  styleUrl: './verticalsurveillances-system.component.css'
})
export class VerticalsurveillancesSystemComponent  {
  title = 'Vertical Surveillance System';

  // Dropdown data
  names: string[] = [];
  selectedName: string = '';
  showExportInfo = false;
  // Table data source
  displayedColumns: string[] = ['date', 'checkInTime', 'checkOutTime'];
  dataSource = new MatTableDataSource<any>();
  employee = {
    name: "John A. Smith",
    id: 21387,
    access: "Allowed",
    company: "Northface",
    floor: "7th",
    validTill: "12-08-2026",
    photoUrl: "assets/photo-logo.png",
  };
  // Complete data fetched from the Excel sheet
  allData = [
    { name: '7465-Irfan-tenant', date: '2024-12-01', checkInTime: '17:07:44', checkOutTime: '17:10:14' },
    { name: '1498-Shabir-employee', date: '2024-12-01', checkInTime: '07:55:00', checkOutTime: '15:33:00' },
    { name: '2834-Umair-employee', date: '2024-12-01', checkInTime: '07:43:00', checkOutTime: '14:15:00' },
    { name: '3542-Hamza-visitor', date: '2024-12-01', checkInTime: '09:48:00', checkOutTime: '16:29:00' },
    { name: '5912-Ahmad-tenant', date: '2024-12-01', checkInTime: '10:48:00', checkOutTime: '19:22:00' }
    // Add more entries as required
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    // Populate dropdown with unique names
    this.names = [...new Set(this.allData.map(data => data.name))];
    this.dataSource.data = []; // Initially no data is shown until a name is selected.
  }

  ngAfterViewInit(): void {
    // Attach paginator to table data source
    this.dataSource.paginator = this.paginator;
  }

  // Function to handle dropdown change
  onNameChange(event: any): void {
    const selectedName = event.value;
    console.log('Selected Name:', selectedName);
    this.selectedName = selectedName;

    // Filter check-in logs based on the selected name
    const filteredData = this.allData.filter(data => data.name === selectedName);
    this.dataSource.data = filteredData;

    // Debugging: Log the filtered data
    console.log('Filtered Data:', filteredData);
  }

  // Function to export data as CSV
 

  // Helper function to convert data to CSV format
  private convertToCSV(data: any[]): string {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    return `${headers}\n${rows}`;
  }
  toggleExportInfo(): void {
    this.showExportInfo = !this.showExportInfo;
  }
  
  exportAsCsv(): void {
    console.log('Exporting as CSV...');
    // Implement CSV export logic here
  }
}
