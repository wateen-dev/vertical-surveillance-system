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
    // return this.http.get<Violation[]>(this.apiUrl).pipe(
    //   catchError(err => {
    //     console.error('API failed, returning dummy data', err);
    const fallback: Violation[] = [
      { violationId: 101, violationType: 'PPE Non-Compliance', description: 'Worker not wearing helmet', date: '2025-09-25', violationTime: '09:15 AM', confidence: 92, location: 'Karachi Plant' },
      { violationId: 102, violationType: 'Fire Safety', description: 'Fire exit blocked by equipment', date: '2025-09-26', violationTime: '11:45 AM', confidence: 87, location: 'Lahore Warehouse' },
      { violationId: 103, violationType: 'Unauthorized Access', description: 'Unregistered person in restricted zone', date: '2025-09-27', violationTime: '02:30 PM', confidence: 95, location: 'Islamabad Office' },
      { violationId: 104, violationType: 'Suspicious Behavior', description: 'Crowd detected in restricted area', date: '2025-09-27', violationTime: '04:10 PM', confidence: 78, location: 'Faisalabad Factory' },
      {
        violationId: 105,
        violationType: 'POS Anomaly',
        description: 'Unusual transaction pattern detected at billing counter',
        date: '2025-09-28',
        violationTime: '08:55 AM',
        confidence: 89,
        location: 'Multan Refinery'
      },
      {
        violationId: 106,
        violationType: 'Shoplifting Detection',
        description: 'Individual detected leaving premises without completing checkout',
        date: '2025-09-28',
        violationTime: '06:20 PM',
        confidence: 91,
        location: 'Rawalpindi Depot'
      },
      {
        violationId: 107,
        violationType: 'Billing Irregularity',
        description: 'Transaction completed but receipt was not generated or printed',
        date: '2025-09-28',
        violationTime: '03:45 PM',
        confidence: 87,
        location: 'Lahore Sales Terminal'
      }

    ];

    return of(fallback);
    //   })
    // );
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
    const dummyData  = [
      { position: 1, employeeId: '280744', employeeName: 'Ali Raza', efficiency: 98 },
      { position: 2, employeeId: '6137', employeeName: 'Sara Khan', efficiency: 95 },
      { position: 3, employeeId: '6071', employeeName: 'Ahmed Iqbal', efficiency: 92 },
    ];
    // Simulate an async call with a short delay
    return of(dummyData).pipe(delay(800));
  }
  getHourlyFootfall(): Observable<any[]> {
    return this.http.get<any[]>(`${this.local_apiUrl}Vertical/GetHourlyVisits`);
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

}
