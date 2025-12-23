import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnalyticsCard, ViolationService } from '../services/violation.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { KeyValue } from '@angular/common';
import { DataService } from '../../service/DataService';
import { AnalyticsTileConfig } from '../../models/AnalyticsTileConfig';
import { NAMAK_MANDI_TILES } from '../../config/namak-mandi.analytics.config';
import { SAPPHIRE_TILES } from '../../config/sapphire.analytics.config';
@Component({
  selector: 'app-analytics-overview',
  templateUrl: './analytics-overview.component.html',
  styleUrls: ['./analytics-overview.component.scss'],
})
export class AnalyticsOverviewComponent implements OnInit {
  analyticsData: Record<string, AnalyticsCard> = {};
  tiles: (AnalyticsTileConfig & {
    displayValue?: string | number;
    displayChange?: string | null;
    displayNote?: string | null;
  })[] = [];
  tileDataContext: any = {};

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
      "Sink Area Footfall",
      "Table Cleaning Time",
      "Employee Efficiency",
      "Conversion Rate",
      "Receipt Count",
      "SOP Violations",
      "Revenue Today",
      "Camera Health"
    ];
    return order.indexOf(a.key) - order.indexOf(b.key);
  };

  constructor(private violationService: ViolationService, private router: Router, private dialog: MatDialog, private companyContext: DataService) { }

  ngOnInit(): void {
    this.loadAnalyticsData();
  }

  loadAnalyticsData(): void {
    this.isLoading = true;
    forkJoin({
      avgQueue: this.violationService.getTodayAverageWaitTime(),
      footfall: this.violationService.getTodayFootfall(),
      receipts: this.violationService.getReceiptCount(),
      violations: this.violationService.getRealViolations()
    }).subscribe(data => {
      this.tileDataContext = {
        avgQueue: data.avgQueue?.avgWaitTimeMinutes || 0,
        footfall: data.footfall || 0,
        receipts: data.receipts?.[0]?.receiptCount || 0,
        violations: data.violations?.length || 0
      };

      this.loadTilesByCompany();
      this.isLoading = false;
    });
  }

  loadTilesByCompany(): void {

    const companyCode = this.companyContext.getCompanyCode()?.toString(); // 'sapphire' or 'namakmandi'
    let config: AnalyticsTileConfig[] = [];

    switch (companyCode) {
      case 'namakmandi':
        config = NAMAK_MANDI_TILES;
        break;
      case 'sapphire':
        config = SAPPHIRE_TILES;
        break;
      default:
        config = [];
    }

    this.tiles = config
      .map(tile => ({
        ...tile,
        displayValue: tile.value(this.tileDataContext),
        displayChange: tile.change ? tile.change(this.tileDataContext) : null,
        displayNote: tile.note ? tile.note(this.tileDataContext) : null
      }))
      .sort((a, b) => a.order - b.order);
  }
  onTileClick(tile: AnalyticsTileConfig): void {
    this.isLoading = true; // show loading overlay
    this.dialogTitle = tile.label;

    switch (tile.onClick) {
      case 'avgQueue':
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
        break;

      case 'employeeEfficiency':
        forkJoin({
          employees: this.violationService.getEmployeeEfficiency(),
          queues: this.violationService.getTodayAverageWaitTimeByQueue()
        }).subscribe({
          next: ({ employees, queues }) => {
            this.employeeEfficiencyData = employees.map((emp, index) => {
              const queueData = queues[index];
              return {
                ...emp,
                avgWaitTimeMinutes: queueData?.avgWaitTimeMinutes ?? 'N/A',
                customersServed: queueData?.customersServed ?? 'N/A'
              };
            });

            // Optional: sort by avgWaitTimeMinutes
            this.employeeEfficiencyData.sort((a, b) => {
              const aTime = a.avgWaitTimeMinutes === 'N/A' ? Infinity : a.avgWaitTimeMinutes;
              const bTime = b.avgWaitTimeMinutes === 'N/A' ? Infinity : b.avgWaitTimeMinutes;
              return aTime - bTime;
            });

            this.openDialog(this.employeeEfficiencyDialog, '1200px');
          },
          error: (err) => {
            console.error('Error fetching Employee Efficiency or Queue Data:', err);
            this.isLoading = false;
          }
        });
        break;

      case 'receiptCount':
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
        break;

      case 'route':
        if (tile.route) {
          this.router.navigate([tile.route]);
        }
        this.isLoading = false;
        break;

      default:
        this.isLoading = false;
        break;
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