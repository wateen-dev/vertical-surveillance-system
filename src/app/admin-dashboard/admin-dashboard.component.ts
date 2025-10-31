import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
     @ViewChild('performanceSection', { static: true }) performanceSection!: ElementRef;
  @ViewChild('analyticsSection', { static: true }) analyticsSection!: ElementRef;
  @ViewChild('realTimeSection', { static: true }) realTimeSection!: ElementRef; // ✅ added
  @ViewChild('performanceOverviewSection', { static: true }) performanceOverviewSection!: ElementRef; // ✅ NEW

  constructor(private renderer: Renderer2) {}

  //  ngAfterViewInit() {
  //   const sections = [
  //     { element: this.performanceSection.nativeElement, type: 'slide' },
  //     { element: this.analyticsSection.nativeElement, type: 'fade' },
  //     { element: this.realTimeSection.nativeElement, type: 'fade-in' },
  //     { element: this.performanceOverviewSection.nativeElement, type: 'fade-in-left' } // ✅ NEW
  //   ];

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         const target = entry.target as HTMLElement;

  //         if (entry.isIntersecting) {
  //           this.renderer.addClass(target, 'visible');

  //           if (target.classList.contains('fade-in-left')) {
  //             this.renderer.removeClass(target, 'fade-out-right');
  //           } else if (target.classList.contains('fade-in')) {
  //             this.renderer.removeClass(target, 'fade-out');
  //           }
  //         } else {
  //           this.renderer.removeClass(target, 'visible');

  //           if (target.classList.contains('fade-in-left')) {
  //             this.renderer.addClass(target, 'fade-out-right');
  //           } else if (target.classList.contains('fade-in')) {
  //             this.renderer.addClass(target, 'fade-out');
  //           }
  //         }
  //       });
  //     },
  //     { threshold: 0.2 }
  //   );

  //   sections.forEach((s) => observer.observe(s.element));
  // }
}