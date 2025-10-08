import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

interface BusinessInsight {
  title: string;
  tag: string;
  tagColor: string;
  description: string;
  value: string;
  valueColor: string;
  confidence: string;
  confidenceColor: string;
  detailsLink: string;
}

@Component({
  selector: 'app-business-insights',
  templateUrl: './business-insights.component.html',
  styleUrls: ['./business-insights.component.scss']
})
export class BusinessInsightsComponent implements OnInit {
  status = 'AI Active';
  businessInsights$: Observable<BusinessInsight[]> = of([]);
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  constructor(private dialog: MatDialog) { }
  ngOnInit() {
    this.businessInsights$ = of([
      {
        title: 'Peak Hours Optimization',
        tag: 'Operations',
        tagColor: '#007bff',
        description: 'AI recommends increasing staff by 15% during 14:00–18:00 peak hours',
        value: '+8.5% revenue potential',
        valueColor: '#14b8a6',
        confidence: '94% confidence',
        confidenceColor: '#2563eb',
        detailsLink: '#'
      },
      {
        title: 'Loss Prevention Alert',
        tag: 'Security',
        tagColor: '#ef4444',
        description: 'Unusual activity patterns detected in Karachi Dolmen Mall jewelry section',
        value: 'PKR 45,000 potential loss prevented',
        valueColor: '#16a34a',
        confidence: '89% confidence',
        confidenceColor: '#2563eb',
        detailsLink: '#'
      },
      {
        title: 'Inventory Restock Alert',
        tag: 'Inventory',
        tagColor: '#f59e0b',
        description: 'Men’s formal wear stock running low in Lahore outlets — restock recommended',
        value: 'PKR 2.3L potential lost sales',
        valueColor: '#16a34a',
        confidence: '96% confidence',
        confidenceColor: '#2563eb',
        detailsLink: '#'
      },
      {
        title: 'Customer Experience',
        tag: 'Experience',
        tagColor: '#10b981',
        description: 'Queue wait times increased by 23% — recommend additional checkout counters',
        value: '15% customer satisfaction improvement',
        valueColor: '#16a34a',
        confidence: '91% confidence',
        confidenceColor: '#2563eb',
        detailsLink: '#'
      },

      // 🔹 NEW CASES BELOW
      {
        title: 'Energy Usage Optimization',
        tag: 'Sustainability',
        tagColor: '#22c55e',
        description: 'AI suggests adjusting HVAC schedules to reduce energy waste during off-peak hours',
        value: '12% monthly cost reduction',
        valueColor: '#14b8a6',
        confidence: '93% confidence',
        confidenceColor: '#2563eb',
        detailsLink: '#'
      },
      {
        title: 'Sales Forecast Accuracy',
        tag: 'Analytics',
        tagColor: '#8b5cf6',
        description: 'Predictive model accuracy improved after last dataset retraining using Q3 data',
        value: '+11.2% forecast reliability',
        valueColor: '#14b8a6',
        confidence: '97% confidence',
        confidenceColor: '#2563eb',
        detailsLink: '#'
      },
      {
        title: 'Employee Performance Insights',
        tag: 'HR',
        tagColor: '#ec4899',
        description: 'Employee retention risk detected for top 5% performers — initiate retention plan',
        value: 'Potential PKR 1.2M cost saving',
        valueColor: '#16a34a',
        confidence: '88% confidence',
        confidenceColor: '#2563eb',
        detailsLink: '#'
      },
      {
        title: 'Store Conversion Rate',
        tag: 'Marketing',
        tagColor: '#3b82f6',
        description: 'Conversion rate improved by 9.8% after implementing targeted campaign in Islamabad',
        value: 'PKR 340,000 additional daily revenue',
        valueColor: '#16a34a',
        confidence: '95% confidence',
        confidenceColor: '#2563eb',
        detailsLink: '#'
      },
      {
        title: 'Maintenance Efficiency',
        tag: 'Facilities',
        tagColor: '#6366f1',
        description: 'Proactive maintenance reduced machine downtime by 27% across production units',
        value: 'PKR 1.8M monthly operational savings',
        valueColor: '#14b8a6',
        confidence: '92% confidence',
        confidenceColor: '#2563eb',
        detailsLink: '#'
      },
      {
        title: 'Online Engagement Surge',
        tag: 'Digital',
        tagColor: '#0ea5e9',
        description: 'Website engagement up 34% after optimizing mobile layout and loading speed',
        value: '+7.4K new daily active users',
        valueColor: '#16a34a',
        confidence: '90% confidence',
        confidenceColor: '#2563eb',
        detailsLink: '#'
      }
    ]);

  }
  openDetailsDialog(item: any) {
    this.dialog.open(this.dialogTemplate, {
      width: '650px',
      maxWidth: '95vw',
      panelClass: 'custom-dialog-container',
      data: item
    });
  }
}
