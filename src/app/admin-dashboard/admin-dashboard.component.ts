import { Component, Type, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { DataService } from '../service/DataService';

interface DashboardSection {
  key: string;
  title: string;
  subtitle?: string;
  show?: boolean;
  button?: { label: string; enabled: boolean; action: () => void };
  component?: Type<any> | string;
  extraData?: any;
  colSize?: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  @ViewChild('performanceSection', { static: true }) performanceSection!: ElementRef;
  @ViewChild('analyticsSection', { static: true }) analyticsSection!: ElementRef;
  @ViewChild('realTimeSection', { static: true }) realTimeSection!: ElementRef;
  @ViewChild('performanceOverviewSection', { static: true }) performanceOverviewSection!: ElementRef;

  sections: DashboardSection[][] = [];
  branchName = '';
  openTime = '09:00 AM';
  closeTime = '10:00 PM';

  constructor(private renderer: Renderer2, private companyContext: DataService) {}

  ngOnInit(): void {
    this.loadSectionsByCompany();
  }

  /** Auto-select branch and load sections based on company */
  loadSectionsByCompany(): void {
    const companyCode = this.companyContext.getCompanyCode()?.toString()?.toLowerCase(); // 'sapphire' or 'namakmandi'

    if (companyCode === 'namakmandi') {
      this.branchName = 'NamakMandi';
    } else {
      this.branchName = 'Saphire';
    }

    this.loadSections(this.branchName);
  }

  /** Build dashboard sections for a given branch */
  loadSections(branch: string): void {
    const isSaphire = branch === 'Saphire';
    const isNamakMandi = branch === 'NamakMandi';

    this.sections = [
      // Row 1: Filters
      [
        {
          key: 'filters',
          title: isSaphire ? 'Outlet Analytics Filters' : 'Branch Location Filters',
          component: 'app-dashboard-filters',
          show: true,
          colSize: 'col-sm-12'
        }
      ],

      // Row 2: Overview
      [
        {
          key: 'overview',
          title: isSaphire ? 'Retail AI Analytics Overview' : 'Restaurant AI Overview',
          subtitle: 'Real-time insights across outlets',
          component: 'app-analytics-overview',
          extraData: { openTime: this.openTime, closeTime: this.closeTime },
          show: true,
          colSize: 'col-sm-12'
        }
      ],

      // Row 3: Footfall + Alerts (show for both)
      [
        {
          key: 'footfall',
          title: 'Footfall & Revenue Tracking',
          subtitle: 'Real-time data from all outlets',
          component: 'app-live-footfall-chart',
          show: true,
          colSize: 'col-sm-8'
        },
        {
          key: 'alerts',
          title: 'Alerts & Notifications',
          component: 'app-app-violations',
          show: true,
          colSize: 'col-sm-4'
        }
      ],

      // Row 4: Sales Category + Heatmap (show for both)
      [
        {
          key: 'salesCategory',
          title: 'Sales by Category',
          subtitle: "Today's distribution",
          component: 'app-sales-category-chart',
          show: true,
          colSize: 'col-sm-6'
        },
        {
          key: 'heatmap',
          title: 'Daily Footfall Heatmap',
          subtitle: 'Sales performance & Security monitoring',
          component: 'app-heatmap-chart',
          show: true,
          colSize: 'col-sm-6'
        }
      ],

      // Row 5: System Health + Business Insights
      [
        {
          key: 'systemHealth',
          title: 'System Health Overview',
          subtitle: 'Network & Infrastructure status',
          component: 'app-system-health',
          show: true, // hide for NamakMandi
          colSize: 'col-sm-4'
        },
        {
          key: 'businessInsights',
          title: 'Business Insights',
          subtitle: 'Real-time recommendations from advanced analytics',
          component: 'app-business-insights',
          show: true, // hide for NamakMandi
          colSize: 'col-sm-8'
        }
      ],
      // Row 6: Top Performing Outlets
      [
        {
          key: 'topPerforming',
          title: 'Top Performing Outlets',
          subtitle: 'Employee efficiency and customer satisfaction leaders',
          button: {
            label: 'View Detailed Analytics →',
            enabled: true,
            action: () => this.onTopPerformingClick()
          },
          component: 'app-top-performing-outlets',
          show: isSaphire, // hide for NamakMandi
          colSize: 'col-sm-12'
        }
      ],
      // Row 7: Competitor Outlets
      [
        {
          key: 'competitor',
          title: 'Competitor Outlets',
          subtitle: 'Top competing restaurants identified from location, ratings, and customer activity',
          button: {
            label: 'View Competitor Insights →',
            enabled: false,
            action: () => this.onCompetitorClick()
          },
          component: 'app-competitor-outlets',
          show: isNamakMandi, // show only for NamakMandi
          colSize: 'col-sm-12'
        }
      ]
    ];
  }

  onTopPerformingClick(): void {
    const competitorSection = this.sections.flat().find((s) => s.key === 'competitor');
    if (competitorSection && competitorSection.button) {
      competitorSection.button.enabled = true;
    }
  }

  onCompetitorClick(): void {
    console.log('Competitor Insights Clicked');
  }
}
