import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { environment } from '../../../environment/environment';

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

export interface GoogleInfo {
  type?: string;
  address?: string;
  phone?: string;
  website?: string;
  user_review?: string;
}

export interface Review {
  user: string;
  comment: string;
  stars: number;
}

export interface OutletDetails {
  name: string;
  rating: number;
  status?: string;
  googleInfo?: GoogleInfo;
  reviews?: Review[];
}

@Injectable({
  providedIn: 'root'
})
export class ViolationService {
  private apiKey = "5b0e0c4d7c4035aea2f0a25a17ff4a4c552e4126acc153ba9e0d20e08368565f";
  private apiUrl = environment.apiUrl;
  private local_apiUrl = environment.localApiUrl;
  private deploy_url = "https://localhost:44315/api/"
  constructor(private http: HttpClient) { }

  getViolations(): Observable<Violation[]> {
    const fallback: Violation[] = [
      { violationId: 101, violationType: 'PPE Non-Compliance', description: 'Worker not wearing helmet', date: '2025-09-25', violationTime: '09:15 AM', confidence: 92, location: 'Karachi Plant' },
      { violationId: 102, violationType: 'Fire Safety', description: 'Fire exit blocked by equipment', date: '2025-09-26', violationTime: '11:45 AM', confidence: 87, location: 'Lahore Warehouse' },
      { violationId: 103, violationType: 'Unauthorized Access', description: 'Unregistered person in restricted zone', date: '2025-09-27', violationTime: '02:30 PM', confidence: 95, location: 'Islamabad Office' },
      { violationId: 104, violationType: 'Suspicious Behavior', description: 'Crowd detected in restricted area', date: '2025-09-27', violationTime: '04:10 PM', confidence: 78, location: 'Faisalabad Factory' },
      { violationId: 105, violationType: 'POS Anomaly', description: 'Unusual transaction pattern detected at billing counter', date: '2025-09-28', violationTime: '08:55 AM', confidence: 89, location: 'Multan Refinery' },
      { violationId: 106, violationType: 'Shoplifting Detection', description: 'Individual detected leaving premises without completing checkout', date: '2025-09-28', violationTime: '06:20 PM', confidence: 91, location: 'Rawalpindi Depot' },
      { violationId: 107, violationType: 'Billing Irregularity', description: 'Transaction completed but receipt was not generated or printed', date: '2025-09-28', violationTime: '03:45 PM', confidence: 87, location: 'Lahore Sales Terminal' }
    ];

    return this.http.get<any[]>(`${this.local_apiUrl}Vertical/GetViolations`).pipe(
      map(apiData => {
        if (!apiData || apiData.length === 0) {
          return fallback; // fallback only
        }

        // Convert real API data to match Violation structure
        const realViolations: Violation[] = apiData.map(v => ({
          violationId: v.violationId,
          violationType: v.violationName || 'General Surveillance Event',
          description: v.violationName || 'No Description',
          date: v.violationDate ? v.violationDate.split('T')[0] : '',
          violationTime: v.violationTime || '',
          confidence: v.violationDuration
            ? Math.min(100, Math.max(90, parseFloat(v.violationDuration)))
            : this.estimateConfidence({ violationId: v.violationId } as Violation),
          location: v.cameraId || 'Unknown Location'
        }));

        // Merge real violations first, fallback last
        return [...realViolations, ...fallback];
      }),
      catchError(err => {
        console.error('API failed, returning dummy data', err);
        return of(fallback);
      })
    );
  }

  getTodayAverageWaitTime(): Observable<any> {
    return this.http.get<any>(this.local_apiUrl + 'Vertical/GetTodayAverageWaitTime');
  }
  getTodayAverageWaitTimeByQueue(): Observable<any> {
    return this.http.get<any>(this.local_apiUrl + 'Vertical/GetTodayAverageWaitTimeByQueue');
  }
  getTodayFootfall(): Observable<number> {
    return this.http.get<any[]>(this.local_apiUrl + 'Vertical/GetHourlyVisits').pipe(
      map((data) => data.reduce((sum, item) => sum + (item.visitCount || 0), 0)),
      catchError(() => of(0))
    );
  }


  getEmployeeEfficiency(): Observable<any[]> {
    const dummyData = [
      { position: 1, employeeId: '280744', employeeName: 'Ali Raza', efficiency: null },
      { position: 2, employeeId: '6137', employeeName: 'Sara Khan', efficiency: null },

    ];
    // Simulate an async call with a short delay
    return of(dummyData).pipe(delay(800));
  }
  getHourlyFootfall(): Observable<any[]> {
    return this.http.get<any[]>(`${this.local_apiUrl}Vertical/GetHourlyVisits`);
  }
  getHourlyConversionRate(): Observable<any[]> {
    return this.http.get<any[]>(`${this.local_apiUrl}Vertical/Get_hourly_Conversion_rate`);
  }
  getHeatMap(): Observable<any[]> {
    return this.http.get<any[]>(`${this.local_apiUrl}Vertical/GetHeatMap`);
  }
  getRealViolations(): Observable<any[]> {
    debugger
    return this.http.get<any[]>(`${this.local_apiUrl}Vertical/GetViolations`);
  }

  searchOutlet(payload: any): Observable<any> {
    return this.http.post(`${this.local_apiUrl}Vertical/SearchOutlet`, payload);
  }
  getPlaceReviews(placeId: string): Observable<any> {
    return this.http.get(`${this.local_apiUrl}Vertical/GetPlaceReviews?placeId=${placeId}`);
  }
  getReceiptCount(): Observable<any[]> {
    return this.http.get<any[]>(`${this.local_apiUrl}Vertical/GetReceiptCount`);
  }
  getHourlyFootfallAllAreas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.local_apiUrl}Vertical/GetHourlyFootfallAllAreas`);
  }
  getReceiptCountDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.local_apiUrl}Vertical/GetReceiptCountDetails`);
  }
  private estimateConfidence(v: { violationId: number, description?: string }): number {
    // Generate a pseudo-random value between 90 and 100 based on violationId & description
    const base = ((v.violationId % 10) + ((v.description?.length || 10) % 10)); // 0–18
    return Math.min(100, 90 + base); // ensures range 90–100
  }

}
