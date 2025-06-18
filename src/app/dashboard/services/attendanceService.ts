import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private apiUrl = environment.apiUrl;           
      private local_apiUrl = environment.localApiUrl;

  constructor(private http: HttpClient) {}

 
  getStatistics(): Observable<any> {
    return this.http.get(this.local_apiUrl+"Vertical/GetStatistics"); // Adjust the endpoint as needed
  }
  getAttendancePercentage(): Observable<any> {
    return this.http.get(this.local_apiUrl+"Vertical/attendance-percentage");
   
  }
}
