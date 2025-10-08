import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Violation {
  violationId: number;
  violationType: string;
  description: string;
  date: string;
  violationTime: string;
  confidence?: number;
  location?: string;
}
export interface AnalyticsCard {
  value: string | number;
  change?: string;
  note?: string;
  icon?: string;
  color?: string;
}


@Injectable({
  providedIn: 'root'
})
export class ViolationService {
  private apiUrl = 'https://your-api.com/violations'; // replace with your API
  private analyticsUrl = 'https://your-api.com/analytics'; // replace with your API

  constructor(private http: HttpClient) {}

  getViolations(): Observable<Violation[]> {
    // return this.http.get<Violation[]>(this.apiUrl).pipe(
    //   catchError(err => {
    //     console.error('API failed, returning dummy data', err);
    const fallback: Violation[] = [
      { violationId: 101, violationType: 'PPE Non-Compliance', description: 'Worker not wearing helmet', date: '2025-09-25', violationTime: '09:15 AM', confidence: 92, location: 'Karachi Plant' },
      { violationId: 102, violationType: 'Fire Safety', description: 'Fire exit blocked by equipment', date: '2025-09-26', violationTime: '11:45 AM', confidence: 87, location: 'Lahore Warehouse' },
      { violationId: 103, violationType: 'Unauthorized Access', description: 'Unregistered person in restricted zone', date: '2025-09-27', violationTime: '02:30 PM', confidence: 95, location: 'Islamabad Office' },
      { violationId: 104, violationType: 'Suspicious Behavior', description: 'Crowd detected in restricted area', date: '2025-09-27', violationTime: '04:10 PM', confidence: 78, location: 'Faisalabad Factory' },
      { violationId: 105, violationType: 'POS Anomaly', description: 'Worker without safety goggles', date: '2025-09-28', violationTime: '08:55 AM', confidence: 89, location: 'Multan Refinery' },
      { violationId: 106, violationType: 'Shoplifting Detection', description: 'Forklift operated in unsafe manner', date: '2025-09-28', violationTime: '06:20 PM', confidence: 91, location: 'Rawalpindi Depot' }
    ];

    return of(fallback);
    //   })
    // );
  }
  getAnalytics(): Observable<Record<string, AnalyticsCard>> {
    // return this.http.get<Record<string, AnalyticsCard>>(this.analyticsUrl).pipe(
    //   catchError(err => {
    //     console.error('Analytics API failed, returning dummy data', err);

    // const fallback: Record<string, AnalyticsCard> = {
    //   "Items per Bag": { value: "5.6", change: "+0.8 vs yesterday", icon: "shopping_basket" },
    //   "Item theft": { value: 3, note: "2 high priority cases", icon: "report_problem" },
    //   "Receipt Generation": { value: "98.4%", change: "+1.2% improvement", icon: "receipt_long" },
    //   "Cash violation": { value: 4, note: "1 unresolved", icon: "attach_money" },
    //   "Camera blocking": { value: 2, note: "Detected in aisle 3", icon: "videocam_off" },
    //   "Attendance Logs": { value: "96.7%", change: "Up 2.4% this week", icon: "schedule" },
    //   "Dress code Violation": { value: 5, note: "Uniform issues flagged", icon: "checkroom" },
    //   "Store room Performance": { value: "87%", change: "+5% this week", icon: "inventory_2" },
    //   "Customer Footfall": { value: 12489, change: "+15.6% vs yesterday", icon: "groups" },
    //   "Average wait times": { value: "2.7 min", change: "-18s improvement", icon: "hourglass_bottom" },
    //   "Abandoned checkouts": { value: "12.4%", change: "-2.1% improvement", icon: "shopping_cart_checkout" },
    //   "Out-of-stock alerts": { value: 17, note: "Critical: milk, bread", icon: "production_quantity_limits" },
    //   "Unauthorized access alerts": { value: 3, note: "Storage area breaches", icon: "lock_person" },
    //   "Damaged product detection": { value: 21, change: "-4 vs yesterday", icon: "broken_image" },
    //   "Packaging compliance": { value: "94%", change: "+3% compliance", icon: "all_inbox" },
    //   "Energy Waste tracking": { value: "12.6 kWh", change: "-3.2% usage", icon: "energy_savings_leaf" },
    //   "Emergency exit blockage": { value: 1, note: "Blocked near main gate", icon: "emergency" },
    //   "Slip/fall detection": { value: 2, note: "Staff involved", icon: "health_and_safety" }
    // };

 const fallback: Record<string, AnalyticsCard> = {
  "Today's Footfall": { value: 12847, change: "+22.3% vs Yesterday", icon: "groups", color: "#1976d2" }, // Blue
  "Security Incidents": { value: 7, note: "3 High-priority", icon: "security", color: "#ef111c" }, // Red
  "Revenue Today": { value: "PKR 28.5L", change: "+18.4% vs Target", icon: "attach_money", color: "#00ba48" }, // Green
  "Conversion Rate": { value: "44.2%", change: "+4.1% Improvement", icon: "trending_up", color: "#a632fe" }, // Purple
  "Employee Efficiency": { value: 89.2, change: "+6.1% This Week", icon: "insights", color: "#1976d2" },
  "Stock Accuracy": { value: "94.7%", note: "12 Items Misplaced", icon: "inventory", color: "#767cff" },
  "Avg Queue Time": { value: "3.1 min", change: "-24s Improvement", icon: "timer", color: "#01c5b0" },
  "Camera Health": { value: "96.2%", note: "247/258 Cameras Active", icon: "camera_alt", color: "#00cbeb" }
};


        return of(fallback);
    //   })
    // );
  }

}
