import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViolationService, Violation } from '../services/violation.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-violations',
  templateUrl: './app-violations.component.html',
  styleUrl: './app-violations.component.css'
})
export class AppViolationsComponent implements OnInit, AfterViewInit, OnDestroy {
  topViolations: Violation[] = [];
  selectedViolation: Violation | null = null;
  private sub?: Subscription;

  @ViewChild('violationDialog') violationDialog!: TemplateRef<any>;

  constructor(private dialog: MatDialog, private violationService: ViolationService,private router: Router) { }

  ngAfterViewInit(): void {
    // intentionally empty — we don't need to throw errors here
  }

  ngOnInit() {
    this.sub = this.violationService.getViolations().subscribe(data => {
      // Enrich and normalize data
      this.topViolations = (data || []).map(v => {
        const type = (v as any).violationType || '';
        const normalizedType = this.normalizeViolationType(type);

        return {
          ...v,
          violationType: normalizedType,
          location: (v as any).location || (v as any).place || '',
          confidence: (v as any).confidence ?? this.estimateConfidence(v),
          category: this.mapViolationCategory(normalizedType)
        };
      })
        .sort((a, b) => b.violationId - a.violationId) // newest first
        .slice(0, 10);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  /* -------------------------------
     🔹 HELPER: Normalize violation type names
  -------------------------------- */
  private normalizeViolationType(type: string): string {
    const t = (type || '').toLowerCase();

    // Existing types
    if (t.includes('pos')) return 'POS Anomaly';
    if (t.includes('shoplift')) return 'Shoplifting Detection';
    if (t.includes('billing')) return 'Billing Irregularity';
    if (t.includes('unauthorized')) return 'Unauthorized Entry';
    if (t.includes('safety')) return 'Safety Violation';

    // New types based on your data
    if (t.includes('counter_is_empty')) return 'POS Anomaly';
    if (t.includes('receipt_not_cut_in_time')) return 'Billing Irregularity';
    if (t.includes('warehouse_not_clean')) return 'Safety/Housekeeping Violation';

    return 'General Surveillance Event';
  }


  /* -------------------------------
     🔹 HELPER: Map violation categories
  -------------------------------- */
  private mapViolationCategory(type: string): string {
    const t = (type || '').toLowerCase();
    if (t.includes('shoplift')) return 'Security';
    if (t.includes('pos') || t.includes('billing')) return 'Transaction';
    if (t.includes('safety') || t.includes('ppe')) return 'Workplace Safety';
    if (t.includes('unauthorized')) return 'Access Control';
    return 'General';
  }

  /* -------------------------------
     🔹 DIALOG OPEN
  -------------------------------- */
  openViolationDialog(violation: Violation) {
    this.selectedViolation = violation;
    this.dialog.open(this.violationDialog, {
      width: '480px',
      panelClass: 'custom-dialog'
    });
  }

  /* -------------------------------
     🔹 TIME AGO FORMATTER
  -------------------------------- */
  timeAgo(dateStr: string, timeStr: string): string {
    try {
      const dt = new Date(`${dateStr} ${timeStr}`);
      if (isNaN(dt.getTime())) {
        const fallback = new Date(dateStr);
        if (isNaN(fallback.getTime())) return '';
        return this.relativeTimeFromNow(fallback);
      }
      return this.relativeTimeFromNow(dt);
    } catch {
      return '';
    }
  }

  private relativeTimeFromNow(d: Date): string {
    const diff = Math.floor((Date.now() - d.getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  }

  /* -------------------------------
     🔹 COLOR MAPPERS (Accents + Badges)
  -------------------------------- */
  getAccentColor(type = ''): string {
    const t = (type || '').toLowerCase();
    if (t.includes('shoplift')) return 'linear-gradient(180deg,#ff7b7b,#ff5252)';
    if (t.includes('pos')) return 'linear-gradient(180deg,#ffcc80,#ff8a65)';
    if (t.includes('billing')) return 'linear-gradient(180deg,#fdd835,#fbc02d)'; // yellow-gold tone
    if (t.includes('unauthorized')) return 'linear-gradient(180deg,#ab47bc,#8e24aa)';
    if (t.includes('safety') || t.includes('ppe')) return 'linear-gradient(180deg,#90caf9,#42a5f5)';
    if (t.includes('suspicious')) return 'linear-gradient(180deg,#ffd54f,#ffb74d)';
    return 'linear-gradient(180deg,#bdbdbd,#9e9e9e)';
  }

  getAccentColorGradient(type: string = ''): string {
    const t = (type || '').toLowerCase();
    if (t.includes('shoplift')) return '#ff5252';
    if (t.includes('pos')) return '#ff8a65';
    if (t.includes('billing')) return '#fbc02d'; // gold tone
    if (t.includes('unauthorized')) return '#ab47bc';
    if (t.includes('safety') || t.includes('ppe')) return '#42a5f5';
    if (t.includes('suspicious')) return '#ffb74d';
    return '#9e9e9e';
  }

  getAccentColorWithOpacity(type: string, alpha: number = 0.15): string {
    const gradient = this.getAccentColor(type);

    if (gradient.startsWith('linear-gradient')) {
      return gradient
        .replace(/#([0-9a-f]{6})/gi, (match) => {
          const r = parseInt(match.substring(1, 3), 16);
          const g = parseInt(match.substring(3, 5), 16);
          const b = parseInt(match.substring(5, 7), 16);
          return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        });
    }

    if (gradient.startsWith('rgb')) {
      return gradient.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
    }

    return gradient;
  }

  /* -------------------------------
     🔹 CONFIDENCE BADGES
  -------------------------------- */
  getBadgeClass(confidence: number | undefined) {
    if (confidence === undefined) return 'badge-neutral';
    if (confidence >= 85) return 'badge-high';
    if (confidence >= 60) return 'badge-medium';
    return 'badge-low';
  }

  /* -------------------------------
     🔹 FALLBACK CONFIDENCE
  -------------------------------- */
  private estimateConfidence(v: Violation): number {
    return Math.min(98, Math.max(45,
      ((v.violationId % 30) + (v.description?.length || 10) % 50)
    ));
  }

  /* -------------------------------
     🔹 STYLING CLASS PER VIOLATION SEVERITY
  -------------------------------- */
  getViolationClass(type: string): string {
    switch (type.toLowerCase()) {
      case 'critical': return 'violation-critical';
      case 'warning': return 'violation-warning';
      case 'info': return 'violation-info';
      default: return 'violation-default';
    }
  }
  resolveViolation(violationId: number | undefined, dialogRef: any): void {
    if (!violationId) return;

    // Remove the violation from the visible list
    this.topViolations = this.topViolations.filter(v => v.violationId !== violationId);

    // Optionally, mark it as resolved in service if needed later
    // this.violationService.markAsResolved(violationId).subscribe(...);

    dialogRef.close();

    // Optional: Toast or alert feedback
    console.log(`Violation ${violationId} marked as resolved`);
  }
  goToAllViolations(dialogRef: any): void {
    dialogRef.close(); // close the dialog first
    this.router.navigate(['/live-incidents']); // replace '/violations' with your actual route
  }
}