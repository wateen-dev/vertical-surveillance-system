import { Component } from '@angular/core';

interface CityPerformance {
  name: string;
  outlets: number;
  revenue: string;
  conversion: number;
  footfall: number;
  avgTransaction: number;
  satisfaction: number;
  violations: number;
}

@Component({
  selector: 'app-performance-overview',
  templateUrl: './performance-overview.component.html',
  styleUrls: ['./performance-overview.component.css']
})
export class PerformanceOverviewComponent {
  cityData: CityPerformance[] = [
    { name: 'Lahore', outlets: 12, revenue: 'PKR 84.6L', conversion: 42.8, footfall: 45670, avgTransaction: 1850, satisfaction: 4.2, violations: 12 },
    { name: 'Karachi', outlets: 15, revenue: 'PKR 102.3L', conversion: 38.4, footfall: 56890, avgTransaction: 1780, satisfaction: 4.1, violations: 18 },
    { name: 'Islamabad', outlets: 8, revenue: 'PKR 56L', conversion: 47.2, footfall: 32145, avgTransaction: 2100, satisfaction: 4.5, violations: 0 },
    { name: 'Multan', outlets: 6, revenue: 'PKR 32.8L', conversion: 33.5, footfall: 18750, avgTransaction: 1650, satisfaction: 4.0, violations: 6 },
    { name: 'Faisalabad', outlets: 9, revenue: 'PKR 61.4L', conversion: 40.3, footfall: 25480, avgTransaction: 1720, satisfaction: 4.3, violations: 5 },
    { name: 'Peshawar', outlets: 7, revenue: 'PKR 28.6L', conversion: 29.7, footfall: 15240, avgTransaction: 1600, satisfaction: 3.9, violations: 8 }
  ];
}
