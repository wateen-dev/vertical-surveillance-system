import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnalyticsCard, ViolationService } from '../services/violation.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { KeyValue } from '@angular/common';
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
  receiptCountData: any[] = [];
  // ✅ Added dialog references for ng-template
  @ViewChild('avgQueueDialog') avgQueueDialog!: TemplateRef<any>;
  @ViewChild('employeeEfficiencyDialog') employeeEfficiencyDialog!: TemplateRef<any>;
  @ViewChild('receiptCountDialog') receiptCountDialog!: TemplateRef<any>;

  displayedEmployeeColumns = [
  'position',
  'employeeId',
  'employeeName',
  // 'efficiency',
  'avgWaitTimeMinutes',
  'customersServed'
];
// Define the order you want
customOrder = (a: KeyValue<string, any>, b: KeyValue<string, any>): number => {
  const order = [
    "Today's Footfall",
    "Customer Dealing Time",
    "Employee Efficiency",
    "Conversion Rate",
    "Receipt Count",
    "SOP Violations",
    "Revenue Today",
    "Camera Health"
  ];
  return order.indexOf(a.key) - order.indexOf(b.key);
};

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
    ),
    receiptCount: this.violationService.getReceiptCount().pipe(
      catchError(() => of([{ receiptCount: 0 }]))
    )
  }).subscribe(({ avgQueue, todayFootfall, violations, receiptCount }) => {

    const violationCount = violations?.length || 0;
    const receiptValue = receiptCount?.[0]?.receiptCount || 0;
    const footfallValue = todayFootfall || 0;

    // ✅ Conversion Rate Calculation
    const conversionRate = footfallValue > 0
      ? ((receiptValue / footfallValue) * 100).toFixed(2)
      : "0.00";

    this.analyticsData = {
      "Today's Footfall": {
        value: footfallValue,
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
        value: "From ERP",
        change: "+18.4% vs Target",
        icon: "attach_money",
        color: "#00ba48"
      },

      // ✅ Updated Conversion Rate
      "Conversion Rate": {
        value: `${conversionRate}%`,
        change: "+4.1% Improvement",
        icon: "trending_up",
        color: "#a632fe"
      },

      "Employee Efficiency": {
        value: "Leaderboard",
        change: "",
        icon: "insights",
        color: "#1976d2"
      },

      "Receipt Count": {
        value: `${receiptValue}`,
        note: "Total Receipts Generated",
        icon: "inventory",
        color: "#767cff"
      },

      "Customer Dealing Time": {
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

  if (cardKey === 'Customer Dealing Time') {
    this.violationService.getTodayAverageWaitTimeByQueue().subscribe({
      next: (data) => {
        this.avgQueueData = data || [];
        this.openDialog(this.avgQueueDialog, '1000px');
      },
      error: (err) => {
        console.error('Error fetching Avg Queue Time:', err);
        this.isLoading = false;
      }
    });
  }
  else if (cardKey === 'Employee Efficiency') {
  this.isLoading = true;

  forkJoin({
    employees: this.violationService.getEmployeeEfficiency(),
    queues: this.violationService.getTodayAverageWaitTimeByQueue()
  }).subscribe({
    next: ({ employees, queues }) => {
      // Merge employee data with queue info by index
      this.employeeEfficiencyData = employees.map((emp, index) => {
        const queueData = queues[index];
        return {
          ...emp,
          avgWaitTimeMinutes: queueData?.avgWaitTimeMinutes ?? 'N/A',
          customersServed: queueData?.customersServed ?? 'N/A'
        };
      });
      this.employeeEfficiencyData.sort((a, b) => {
        const aTime = a.avgWaitTimeMinutes === 'N/A' ? Infinity : a.avgWaitTimeMinutes;
        const bTime = b.avgWaitTimeMinutes === 'N/A' ? Infinity : b.avgWaitTimeMinutes;
        return aTime - bTime;
      });
      // Open dialog with increased width
      this.openDialog(this.employeeEfficiencyDialog, '1200px');
    },
    error: (err) => {
      console.error('Error fetching Employee Efficiency or Queue Data:', err);
      this.isLoading = false;
    }
  });
  }
  else if (cardKey === 'SOP Violations') {
    this.router.navigate(['/live-incidents']);
    this.isLoading = false;
  }
  else if (cardKey === 'Receipt Count') {
    this.isLoading = true;
    this.violationService.getReceiptCountDetails().subscribe({
      next: (data: any[]) => {
        this.receiptCountData = data || [];
        this.openDialog(this.receiptCountDialog, '1200px');
      },
      error: (err) => {
        console.error('Error fetching Receipt Count:', err);
        this.isLoading = false;
      }
    });
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
      error: (err) => console.error('Error fetching Customer Dealing Time:', err),
    });
  }
  closeDialog(): void {
    this.dialogVisible = false;
  }
  closeAllDialogs(): void {
    this.dialog.closeAll();
  }
}