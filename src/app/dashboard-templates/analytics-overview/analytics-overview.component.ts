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
  // ✅ Added dialog references for ng-template
  @ViewChild('avgQueueDialog') avgQueueDialog!: TemplateRef<any>;
  @ViewChild('employeeEfficiencyDialog') employeeEfficiencyDialog!: TemplateRef<any>;
  displayedEmployeeColumns = [
  'position',
  'employeeId',
  'employeeName',
  'efficiency',
  'avgWaitTimeMinutes',
  'customersServed'
];
// Define the order you want
customOrder = (a: KeyValue<string, any>, b: KeyValue<string, any>): number => {
  const order = [
    "Today's Footfall",
    "Avg Queue Time",
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
    const receiptValue = receiptCount?.[0]?.receiptCount || 0; // 🧠 Extract receiptCount safely

  this.analyticsData = {
  "Today's Footfall": { value: todayFootfall, change: "+22.3% vs Yesterday", icon: "groups", color: "#1976d2" },
  "SOP Violations": { value: violationCount, note: violationCount === 0 ? "No violations today 🎉" : violationCount > 5 ? "High-priority detected 🚨" : `${violationCount} Active Violations`, icon: "security", color: violationCount > 5 ? "#ef111c" : "#ff9800" },
  "Revenue Today": { value: "PKR 28.5M", change: "+18.4% vs Target", icon: "attach_money", color: "#00ba48" },
  "Conversion Rate": { value: "44.2%", change: "+4.1% Improvement", icon: "trending_up", color: "#a632fe" },
  "Employee Efficiency": { value: 89.2, change: "+6.1% This Week", icon: "insights", color: "#1976d2" },
  "Receipt Count": { value: `${receiptValue}`, note: "Total Receipts Generated - POS 2", icon: "inventory", color: "#767cff" },
  "Avg Queue Time": { value: `${avgQueue.avgWaitTimeMinutes?.toFixed(2)} min`, change: "-24s Improvement", icon: "timer", color: "#01c5b0" },
  "Camera Health": { value: "100%", note: "13/13 Cameras Active", icon: "camera_alt", color: "#00cbeb" }
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