import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
interface Incident {
  time: string;
  outlet: string;
  type: string;
  confidence: number;
  status: string;
  severity: string;
}

@Component({
  selector: 'app-live-incidents',
  templateUrl: './live-incidents.component.html',
  styleUrls: ['./live-incidents.component.css'],
  standalone: false,
})
export class LiveIncidentsComponent implements AfterViewInit {
  constructor(private router: Router) {}
  displayedColumns: string[] = ['time', 'outlet', 'type', 'confidence', 'status', 'severity', 'actions'];
  originalData: Incident[] = [
    { time: '2:32:15 PM', outlet: 'Karachi', type: 'Shoplifting Detection', confidence: 96, status: 'Active', severity: 'High' },
    { time: '2:28:42 PM', outlet: 'Lahore', type: 'POS Anomaly', confidence: 89, status: 'Investigating', severity: 'High' },
    { time: '2:15:18 PM', outlet: 'Islamabad', type: 'Loitering Alert', confidence: 82, status: 'Monitoring', severity: 'Medium' },
    { time: '1:57:33 PM', outlet: 'Lahore', type: 'Grab & Run Attempt', confidence: 93, status: 'Prevented', severity: 'High' },
    { time: '1:44:27 PM', outlet: 'Karachi', type: 'Return Fraud', confidence: 87, status: 'Investigating', severity: 'Medium' },
    { time: '1:21:19 PM', outlet: 'Rawalpindi', type: 'Staff Area Breach', confidence: 91, status: 'Resolved', severity: 'Medium' },
    { time: '1:05:42 PM', outlet: 'Peshawar', type: 'Suspicious Movement', confidence: 77, status: 'Monitoring', severity: 'Low' },
    { time: '12:58:09 PM', outlet: 'Lahore', type: 'POS Anomaly', confidence: 88, status: 'Investigating', severity: 'Medium' },
    { time: '12:45:32 PM', outlet: 'Karachi', type: 'Unauthorized Entry', confidence: 95, status: 'Active', severity: 'High' },
    { time: '12:33:14 PM', outlet: 'Islamabad', type: 'Loitering Alert', confidence: 79, status: 'Monitoring', severity: 'Low' },
    { time: '12:20:48 PM', outlet: 'Rawalpindi', type: 'Shoplifting Detection', confidence: 92, status: 'Prevented', severity: 'Medium' },
    { time: '12:08:51 PM', outlet: 'Faisalabad', type: 'POS Anomaly', confidence: 84, status: 'Investigating', severity: 'Medium' },
    { time: '11:55:33 AM', outlet: 'Karachi', type: 'Grab & Run Attempt', confidence: 97, status: 'Active', severity: 'High' },
    { time: '11:42:17 AM', outlet: 'Lahore', type: 'Return Fraud', confidence: 90, status: 'Investigating', severity: 'Medium' },
    { time: '11:29:46 AM', outlet: 'Islamabad', type: 'Staff Area Breach', confidence: 86, status: 'Resolved', severity: 'Medium' },
    { time: '11:15:22 AM', outlet: 'Peshawar', type: 'Loitering Alert', confidence: 75, status: 'Monitoring', severity: 'Low' },
    { time: '11:01:08 AM', outlet: 'Karachi', type: 'Shoplifting Detection', confidence: 94, status: 'Prevented', severity: 'High' },
    { time: '10:48:49 AM', outlet: 'Lahore', type: 'POS Anomaly', confidence: 83, status: 'Investigating', severity: 'Medium' },
    { time: '10:35:16 AM', outlet: 'Islamabad', type: 'Unauthorized Entry', confidence: 91, status: 'Active', severity: 'High' },
    { time: '10:21:55 AM', outlet: 'Rawalpindi', type: 'Staff Area Breach', confidence: 88, status: 'Resolved', severity: 'Low' },
    { time: '10:10:33 AM', outlet: 'Karachi', type: 'Grab & Run Attempt', confidence: 93, status: 'Prevented', severity: 'High' },
    { time: '9:58:14 AM', outlet: 'Lahore', type: 'Return Fraud', confidence: 80, status: 'Monitoring', severity: 'Medium' },
    { time: '9:45:47 AM', outlet: 'Islamabad', type: 'Loitering Alert', confidence: 78, status: 'Investigating', severity: 'Low' },
    { time: '9:31:22 AM', outlet: 'Faisalabad', type: 'POS Anomaly', confidence: 85, status: 'Investigating', severity: 'Medium' },
    { time: '9:18:59 AM', outlet: 'Rawalpindi', type: 'Shoplifting Detection', confidence: 90, status: 'Resolved', severity: 'Low' },
    { time: '9:05:40 AM', outlet: 'Karachi', type: 'Unauthorized Entry', confidence: 96, status: 'Active', severity: 'High' },
    { time: '8:52:13 AM', outlet: 'Lahore', type: 'Grab & Run Attempt', confidence: 92, status: 'Prevented', severity: 'Medium' },
    { time: '8:39:47 AM', outlet: 'Islamabad', type: 'Return Fraud', confidence: 89, status: 'Investigating', severity: 'Medium' },
    { time: '8:25:24 AM', outlet: 'Rawalpindi', type: 'Staff Area Breach', confidence: 87, status: 'Resolved', severity: 'Low' },
    { time: '8:12:58 AM', outlet: 'Peshawar', type: 'Suspicious Movement', confidence: 76, status: 'Monitoring', severity: 'Low' }
  ];

  dataSource = new MatTableDataSource<Incident>(this.originalData);

  cityList = ['All Cities', 'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi'];
  violationList = ['All Violations', 'Shoplifting Detection', 'POS Anomaly', 'Loitering Alert', 'Grab & Run Attempt', 'Return Fraud', 'Staff Area Breach'];
  statuses = ['Active', 'Investigating', 'Monitoring', 'Prevented', 'Resolved'];
  severities = ['High', 'Medium', 'Low'];

  selectedCity = 'All Cities';
  selectedViolation = 'All Violations';
  selectedStatus = '';
  selectedSeverity = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilters() {
    this.dataSource.data = this.originalData.filter(item => {
      const cityMatch = this.selectedCity === 'All Cities' || item.outlet === this.selectedCity;
      const violationMatch = this.selectedViolation === 'All Violations' || item.type === this.selectedViolation;
      const statusMatch = !this.selectedStatus || item.status === this.selectedStatus;
      const severityMatch = !this.selectedSeverity || item.severity === this.selectedSeverity;
      return cityMatch && violationMatch && statusMatch && severityMatch;
    });
  }

  clearFilters() {
    this.selectedCity = 'All Cities';
    this.selectedViolation = 'All Violations';
    this.selectedStatus = '';
    this.selectedSeverity = '';
    this.dataSource.data = this.originalData;
  }

  statusColor(status: string) {
    return {
      'chip-active': status === 'Active',
      'chip-investigating': status === 'Investigating',
      'chip-monitoring': status === 'Monitoring',
      'chip-prevented': status === 'Prevented',
      'chip-resolved': status === 'Resolved'
    };
  }

  severityColor(severity: string) {
    return {
      'chip-high': severity === 'High',
      'chip-medium': severity === 'Medium',
      'chip-low': severity === 'Low'
    };
  }
  goToLiveIncident(element: any) {
    // Optional: pass the incident details as query params
    this.router.navigate(['/live-incident-reporting'], {
      queryParams: { 
        outlet: element.outlet,
        type: element.type,
        status: element.status,
        severity: element.severity
      }
    });
  }
}
