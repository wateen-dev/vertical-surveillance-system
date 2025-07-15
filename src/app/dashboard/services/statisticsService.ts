import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private apiUrl = environment.apiUrl;           
      private local_apiUrl = environment.localApiUrl;

  constructor(private http: HttpClient) {}

 
  getStatistics(): Observable<any> {
    return this.http.get(this.local_apiUrl+"Vertical/GetStatistics"); // Adjust the endpoint as needed
  }
  getAttendancePercentage(): Observable<any> {
    return this.http.get(this.local_apiUrl+"Vertical/attendance-percentage");
   
  }
  getEmployeeCheckIns(): Observable<any> {
    return this.http.get(this.local_apiUrl + `Vertical/check-ins`);
  }
   getDiningStatistics(): Observable<any> {
    return this.http.get(this.local_apiUrl + `Vertical/GetDiningStatistics`);
  }
  getCashierStatistics(): Observable<any> {
    return this.http.get(this.local_apiUrl + `Vertical/GetCashierStatistics`);
  }
  // Fetch base64 image using filename from path
  getImageBase64(path: string): Observable<{ thumbnailBase64: string }> {
    debugger
    const fileName = path.split('\\').pop(); // handle Windows-style path
    return this.http.get<{ thumbnailBase64: string }>(
      this.local_apiUrl + `Vertical/GetImagesBase64?fileName=${fileName}`
    );
  }
}
