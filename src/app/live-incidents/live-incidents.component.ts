import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ViolationService } from '../dashboard-templates/services/violation.service';

interface Incident {
  time: string;
  violationId: number;
  cameraId: string;
  violationDuration: number;
  violationDate: string;
  outlet: string;
  type: string;
  confidence: number;
  status: string;
  severity: string;
  isReal?: boolean;
}

@Component({
  selector: 'app-live-incidents',
  templateUrl: './live-incidents.component.html',
  styleUrls: ['./live-incidents.component.css'],
})
export class LiveIncidentsComponent implements OnInit, AfterViewInit {
  constructor(private router: Router, private violationService: ViolationService) {}
  isLoading: boolean = false; // 🔹 Loading state
  displayedColumns: string[] = [
    // 'violationId',
    'time',
    'type',
    'outlet',
    'violationDuration',
    'violationDate',
    // 'confidence',
    'status',
    'severity',
    'cameraId',
    'actions',
  ];

  dataSource = new MatTableDataSource<Incident>([]);
  originalData: Incident[] = [];

  // Filters
  cityList = ['All Cities', 'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi','Y Block Lahore'];
  violationList = [
    'All Violations',
    'Shoplifting Detection',
    'POS Anomaly',
    'Loitering Alert',
    'Grab & Run Attempt',
    'Return Fraud',
    'Staff Area Breach',
  ];
  statuses = ['Active', 'Investigating', 'Monitoring', 'Prevented', 'Resolved'];
  severities = ['High', 'Medium', 'Low'];

  selectedCity = 'All Cities';
  selectedViolation = 'All Violations';
  selectedStatus = '';
  selectedSeverity = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.loadViolations();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // ✅ Load real + dummy violations
  loadViolations() {
  // 🔹 Start spinner
  this.isLoading = true;

  this.violationService.getRealViolations().subscribe({
    next: (apiData: any[]) => {
      const formattedLiveData: Incident[] = apiData.map((v) => ({
        time: this.formatTime(v.violationTime),
        violationId: v.violationId,
        cameraId: v.cameraId,
        violationDuration: Number(v.violationDuration),
        violationDate: v.violationDate,
        outlet: this.mapCameraToOutlet(v.cameraId),
        type: this.mapViolationName(v.violationName),
        confidence: this.randomConfidence(),
        status: this.randomStatus(),
        severity: this.randomSeverity(),
        isReal: true,
      }));

      // Dummy fallback data
      const dummyData: Incident[] = [
        {
          time: '2:32:15 PM',
          violationId: 1001,
          cameraId: 'cam-1',
          violationDuration: 45.6,
          violationDate: '2025-09-28',
          outlet: 'Karachi',
          type: 'Shoplifting Detection',
          confidence: 96,
          status: 'Active',
          severity: 'High',
        },
        {
          time: '2:28:42 PM',
          violationId: 1002,
          cameraId: 'cam-2',
          violationDuration: 75.8,
          violationDate: '2025-09-28',
          outlet: 'Lahore',
          type: 'POS Anomaly',
          confidence: 89,
          status: 'Investigating',
          severity: 'High',
        },
        {
          time: '2:15:18 PM',
          violationId: 1003,
          cameraId: 'cam-3',
          violationDuration: 55.3,
          violationDate: '2025-09-28',
          outlet: 'Islamabad',
          type: 'Loitering Alert',
          confidence: 82,
          status: 'Monitoring',
          severity: 'Medium',
        },
      ];

      this.originalData = [...formattedLiveData, ...dummyData];
      this.dataSource.data = this.originalData;

      // 🔹 Stop spinner when data loads successfully
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Error fetching live violations:', err);
      // 🔹 Stop spinner on error
      this.isLoading = false;
    },
    complete: () => {
      // (Optional) ensures loading stops even if the stream completes early
      this.isLoading = false;
    }
  });
}


  // ✅ Helpers
  private formatTime(timeStr: string): string {
    if (!timeStr) return '--';
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  private mapCameraToOutlet(cameraId: string): string {
    const map: Record<string, string> = {
      'cam-1': 'Lahore',
      'cam-2': 'Karachi',
      'cam-3': 'Y Block Lahore',
      'cam-8': 'Y Block Lahore',
      'cam-4': 'Y Block Lahore',
    };
    return map[cameraId] || 'Unknown';
  }

  private mapViolationName(name: string): string {
    const map: Record<string, string> = {
      counter_is_empty: 'Counter Empty',
      pos_anomaly: 'POS Anomaly',
      shoplifting: 'Shoplifting Detection',
    };
    return map[name] || name.replace(/_/g, ' ');
  }

  private randomConfidence(): number {
    return Math.floor(Math.random() * (98 - 75 + 1)) + 75;
  }

  private randomStatus(): string {
    const list = ['Active', 'Investigating', 'Monitoring', 'Prevented', 'Resolved'];
    return list[Math.floor(Math.random() * list.length)];
  }

  private randomSeverity(): string {
    const list = ['High', 'Medium', 'Low'];
    return list[Math.floor(Math.random() * list.length)];
  }

  // ✅ Filters
  applyFilters() {
    this.dataSource.data = this.originalData.filter((item) => {
      const cityMatch = this.selectedCity === 'All Cities' || item.outlet === this.selectedCity;
      const violationMatch =
        this.selectedViolation === 'All Violations' || item.type === this.selectedViolation;
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
      'chip-resolved': status === 'Resolved',
    };
  }

  severityColor(severity: string) {
    return {
      'chip-high': severity === 'High',
      'chip-medium': severity === 'Medium',
      'chip-low': severity === 'Low',
    };
  }

  goToLiveIncident(element: any) {
    this.router.navigate(['/live-incident-reporting'], {
      queryParams: {
        outlet: element.outlet,
        type: element.type,
        status: element.status,
        severity: element.severity,
        violationId: element.violationId,
        time:element.time,
        violationDate:element.violationDate,
      },
    });
  }
  getDurationColor(duration: number): string {
    if (duration < 30) return '#4caf50'; // green
    if (duration < 60) return '#ffb300'; // amber
    if (duration < 90) return '#ff7043'; // orange
    return '#e53935'; // red for long durations
  }

}
