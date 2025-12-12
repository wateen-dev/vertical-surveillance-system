import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Lov } from '../../lov-manager/lov-manager.component';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { debug } from 'console';
import Hls from 'hls.js';
 // Adjust the path as needed
import { AuthService } from '../../service/auth.service'; // Adjust path as needed

@Injectable({
  providedIn: 'root'
})
export class EmployeeRegistrationService {
    private apiUrl = environment.apiUrl;           
    private local_apiUrl = environment.localApiUrl;
    private emsApiUrl = environment.emsApiUrl;
  constructor(private http: HttpClient, private authService: AuthService) {}

  
  getEmployeeRegistrationDetails(): Observable<any> {
    return this.http.get(this.emsApiUrl+"SalesTrax/GetEmployeeRegistration"); // Adjust the endpoint as needed
  }
postEmployeeRegistration(moduleModel: any): Observable<any> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.authService.getToken()}`
  });

  return this.http.post(
    `${this.local_apiUrl}Vertical/add-employee`,
    moduleModel,
    { headers }
  );
}

  getTenantDetails(): Observable<any> {
    return this.http.get(`${this.local_apiUrl}Vertical/fetch-tenant`, this.authService.getAuthHeaders());
  }

  verifyOtp(otpCode: string): Observable<any> {
    return this.http.get(`${this.local_apiUrl}Vertical/VerifyOtp?otpCode=${otpCode}`, this.authService.getAuthHeaders());
  }

  fetchAllData(): Observable<any> {
    return this.http.get(`${this.local_apiUrl}Vertical/fetch-combined-data`, this.authService.getAuthHeaders());
  }

  fetchCheckInLogs(employeeId: string): Observable<any> {
    return this.http.get(`${this.local_apiUrl}Vertical/GetEmployeeLogs?employeeId=${employeeId}`, this.authService.getAuthHeaders());
  }

  fetchTimestampLogs(employeeId: string): Observable<any> {
    return this.http.get(`${this.local_apiUrl}Vertical/GetTimeStampLogs?employeeId=${employeeId}`, this.authService.getAuthHeaders());
  }

  fetchCheckInLogsVisitors(employeeId: string): Observable<any> {
    return this.http.get(`${this.local_apiUrl}Vertical/GetEmployeeLogsVisitors?employeeId=${employeeId}`, this.authService.getAuthHeaders());
  }

  getEmployeeCheckIns(): Observable<any> {
    return this.http.get(`${this.local_apiUrl}Vertical/check-ins`, this.authService.getAuthHeaders());
  }

  getEfficiencyOvertime(): Observable<any> {
    return this.http.get(`${this.local_apiUrl}Vertical/average-wait-time`, this.authService.getAuthHeaders());
  }

  getSopCompliance(): Observable<any> {
    return this.http.get(`${this.local_apiUrl}Vertical/sop-compliance`, this.authService.getAuthHeaders());
  }
}