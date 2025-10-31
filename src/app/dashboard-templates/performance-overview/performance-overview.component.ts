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
    { name: 'Lahore', outlets: 12, revenue: 'PKR 8M', conversion: 42.8, footfall: 5670, avgTransaction: 1850, satisfaction: 4.2, violations: 12 },
    { name: 'Karachi', outlets: 15, revenue: 'PKR 10M', conversion: 38.4, footfall: 10890, avgTransaction: 1780, satisfaction: 4.1, violations: 18 },
    { name: 'Islamabad', outlets: 8, revenue: 'PKR 5M', conversion: 47.2, footfall: 11145, avgTransaction: 2100, satisfaction: 4.5, violations: 0 },
    { name: 'Multan', outlets: 6, revenue: 'PKR 32.8M', conversion: 33.5, footfall: 12750, avgTransaction: 1650, satisfaction: 4.0, violations: 6 },
    { name: 'Faisalabad', outlets: 9, revenue: 'PKR 6M', conversion: 40.3, footfall: 5480, avgTransaction: 1720, satisfaction: 4.3, violations: 5 },
    { name: 'Peshawar', outlets: 7, revenue: 'PKR 2.6M', conversion: 29.7, footfall: 5240, avgTransaction: 1600, satisfaction: 3.9, violations: 8 }
  ];
}
