import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViolationService, Violation } from '../services/violation.service';
import { Subscription } from 'rxjs';

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

  constructor(private dialog: MatDialog, private violationService: ViolationService) {}

  ngAfterViewInit(): void {
    // intentionally empty — we don't need to throw errors here
  }

  ngOnInit() {
    this.sub = this.violationService.getViolations().subscribe(data => {
      // Map or enrich incoming data to ensure required fields exist
      this.topViolations = (data || []).map(v => ({
        ...v,
        // default fields if missing:
        location: (v as any).location || (v as any).place || '',
        confidence: (v as any).confidence ?? this.estimateConfidence(v),
      }))
      .sort((a, b) => b.violationId - a.violationId) // newest first
      .slice(0, 10);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  openViolationDialog(violation: Violation) {
    this.selectedViolation = violation;
    this.dialog.open(this.violationDialog, {
      width: '480px',
      panelClass: 'custom-dialog'
    });
  }

  // Helper to compute a friendly "time ago" (takes date string and time string)
  timeAgo(dateStr: string, timeStr: string): string {
    try {
      // Try to parse "YYYY-MM-DD" + "HH:MM AM/PM"
      const dt = new Date(`${dateStr} ${timeStr}`);
      if (isNaN(dt.getTime())) {
        // fallback: if dateStr contains full ISO
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

  // Small mapping for left accent color per violation type
  getAccentColor(type = ''): string {
    const t = (type || '').toLowerCase();
    if (t.includes('shoplift') || t.includes('shoplifting')) return 'linear-gradient(180deg,#ff7b7b,#ff5252)';
    if (t.includes('pos') || t.includes('anomaly')) return 'linear-gradient(180deg,#ffcc80,#ff8a65)';
    if (t.includes('suspicious')) return 'linear-gradient(180deg,#ffd54f,#ffb74d)';
    if (t.includes('fire') || t.includes('safety')) return 'linear-gradient(180deg,#ef9a9a,#ef5350)';
    if (t.includes('ppe')) return 'linear-gradient(180deg,#90caf9,#42a5f5)';
    return 'linear-gradient(180deg,#bdbdbd,#9e9e9e)';
  }
 getAccentColorGradient(type: string = ''): string {
  const t = (type || '').toLowerCase();

  if (t.includes('shoplift') || t.includes('shoplifting')) return '#ff5252'; // red
  if (t.includes('pos') || t.includes('anomaly')) return '#ff8a65'; // orange
  if (t.includes('suspicious')) return '#ffb74d'; // amber
  if (t.includes('fire') || t.includes('safety')) return '#ef5350'; // deep red
  if (t.includes('ppe')) return '#42a5f5'; // blue
  if (t.includes('unauthorized')) return '#ab47bc'; // purple
  return '#9e9e9e'; // default gray
}
  getAccentColorWithOpacity(type: string, alpha: number = 0.15): string {
  const gradient = this.getAccentColor(type);

  // Handle linear-gradient case
  if (gradient.startsWith('linear-gradient')) {
    // Replace each hex or rgb with rgba including alpha
    return gradient
      .replace(/#([0-9a-f]{6})/gi, (match) => {
        const r = parseInt(match.substring(1, 3), 16);
        const g = parseInt(match.substring(3, 5), 16);
        const b = parseInt(match.substring(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      })
      .replace(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/gi, (_, r, g, b) => {
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      });
  }

  // If plain rgb color
  if (gradient.startsWith('rgb')) {
    return gradient.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
  }

  // Fallback if something unexpected
  return gradient;
}

  // Badge color class based on confidence
  getBadgeClass(confidence: number | undefined) {
    if (confidence === undefined) return 'badge-neutral';
    if (confidence >= 85) return 'badge-high';
    if (confidence >= 60) return 'badge-medium';
    return 'badge-low';
  }

  // Estimate a fake confidence if backend doesn't provide it
  private estimateConfidence(v: Violation): number {
    // tiny deterministic heuristic so UI looks reasonable
    return Math.min(98, Math.max(45,
      ((v.violationId % 30) + (v.description?.length || 10) % 50)
    ));
  }
  getViolationClass(type: string): string {
  switch (type.toLowerCase()) {
    case 'critical':
      return 'violation-critical';
    case 'warning':
      return 'violation-warning';
    case 'info':
      return 'violation-info';
    default:
      return 'violation-default';
  }
}
}
