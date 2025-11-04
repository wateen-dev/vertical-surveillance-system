import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnalyticsCard, ViolationService } from '../services/violation.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-analytics-overview',
  templateUrl: './analytics-overview.component.html',
  styleUrls: ['./analytics-overview.component.scss'],
})
export class AnalyticsOverviewComponent implements OnInit {
  analyticsData: Record<string, AnalyticsCard> = {};
  dialogVisible = false;
  dialogTitle = '';
  dialogValue: string | number = '';
  avgQueueData: any[] = []; // ✅ Added property
  employeeEfficiencyData: any[] = [];
  isLoading: boolean = false; // 🔹 Loading state
  isLoadingNew: boolean = false; // 🔹 New loading state
  // ✅ Added dialog references for ng-template
  @ViewChild('avgQueueDialog') avgQueueDialog!: TemplateRef<any>;
  @ViewChild('employeeEfficiencyDialog') employeeEfficiencyDialog!: TemplateRef<any>;
  displayedEmployeeColumns: string[] = [
    'position',
    'employeeId',
    'employeeName',
    'efficiency'
  ];

  constructor(private violationService: ViolationService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadAnalyticsData();
  }
  loadAnalyticsData(): void {
    forkJoin({
      avgQueue: this.violationService.getTodayAverageWaitTime().pipe(
        catchError(() => of({ avgWaitTimeMinutes: 0 }))
      ),
      todayFootfall: this.violationService.getTodayFootfall().pipe(
        catchError(() => of(0))
      ),
      violations: this.violationService.getRealViolations().pipe(
        catchError(() => of([]))
      )
    }).subscribe(({ avgQueue, todayFootfall, violations }) => {
      const violationCount = violations?.length || 0;

      this.analyticsData = {
        "Today's Footfall": {
          value: todayFootfall,
          change: "+22.3% vs Yesterday",
          icon: "groups",
          color: "#1976d2"
        },
        "SOP Violations": {
          value: violationCount,
          note:
            violationCount === 0
              ? "No violations today 🎉"
              : violationCount > 5
                ? "High-priority detected 🚨"
                : `${violationCount} Active Violations`,
          icon: "security",
          color: violationCount > 5 ? "#ef111c" : "#ff9800"
        },
        "Revenue Today": {
          value: "PKR 28.5M",
          change: "+18.4% vs Target",
          icon: "attach_money",
          color: "#00ba48"
        },
        "Conversion Rate": {
          value: "44.2%",
          change: "+4.1% Improvement",
          icon: "trending_up",
          color: "#a632fe"
        },
        "Employee Efficiency": {
          value: 89.2,
          change: "+6.1% This Week",
          icon: "insights",
          color: "#1976d2"
        },
        "Stock Accuracy": {
          value: "94.7%",
          note: "12 Items Misplaced",
          icon: "inventory",
          color: "#767cff"
        },
        "Avg Queue Time": {
          value: `${avgQueue.avgWaitTimeMinutes?.toFixed(2)} min`,
          change: "-24s Improvement",
          icon: "timer",
          color: "#01c5b0"
        },
        "Camera Health": {
          value: "100%",
          note: "13/13 Cameras Active",
          icon: "camera_alt",
          color: "#00cbeb"
        }
      };

      this.isLoading = false;
    });
  }


onCardClick(cardKey: string, cardValue: any): void {
  this.isLoading = true; // Show centered loading overlay
  this.dialogTitle = cardKey;

  if (cardKey === 'Avg Queue Time') {
    this.violationService.getTodayAverageWaitTimeByQueue().subscribe({
      next: (data) => {
        this.avgQueueData = data || [];
        this.openDialog(this.avgQueueDialog, '850px');
      },
      error: (err) => {
        console.error('Error fetching Avg Queue Time:', err);
        this.isLoading = false;
      }
    });
  }

  else if (cardKey === 'Employee Efficiency') {
    this.violationService.getEmployeeEfficiency().subscribe({
      next: (data) => {
        this.employeeEfficiencyData = data || [];
        this.openDialog(this.employeeEfficiencyDialog, '950px');
      },
      error: (err) => {
        console.error('Error fetching Employee Efficiency:', err);
        this.isLoading = false;
      }
    });
  }

  else if (cardKey === 'SOP Violations') {
    this.router.navigate(['/live-incidents']);
    this.isLoading = false;
  } 
  
  else {
    this.isLoading = false;
  }
}

// 🔹 Common dialog open method
openDialog(template: TemplateRef<any>, width: string): void {
  this.isLoading = false; // stop spinner before opening dialog
  const dialogRef = this.dialog.open(template, {
    width,
    autoFocus: true,
    disableClose: true, // prevent accidental background clicks
    backdropClass: 'blur-dialog-backdrop'
  });

  dialogRef.afterClosed().subscribe(() => {
    this.isLoading = false;
  });
}

  fetchAvgQueueData(): void {
    this.violationService.getTodayAverageWaitTimeByQueue().subscribe({
      next: (data) => {
        this.avgQueueData = data || [];
        this.dialog.open(this.avgQueueDialog, {
          width: '600px',
        });
      },
      error: (err) => console.error('Error fetching Avg Queue Time:', err),
    });
  }
  closeDialog(): void {
    this.dialogVisible = false;
  }
  closeAllDialogs(): void {
    this.dialog.closeAll();
  }
}