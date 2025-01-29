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

@Injectable({
  providedIn: 'root'
})
export class EmployeeRegistrationService {
    private apiUrl = environment.apiUrl;           
    private local_apiUrl = environment.localApiUrl;

  constructor(private http: HttpClient) {}

  
  getEmployeeRegistrationDetails(): Observable<any> {
    return this.http.get(this.apiUrl+"SalesTrax/GetEmployeeRegistration"); // Adjust the endpoint as needed
  }
  postEmployeeRegistration(moduleModel:any): Observable<any> {
    return this.http.post(this.local_apiUrl+"Vertical/add-employee",moduleModel); // Adjust the endpoint as needed
  }
  getTenantDetails(): Observable<any> {
    return this.http.get(this.local_apiUrl+"Vertical/fetch-tenant"); // Adjust the endpoint as needed
  }
  verifyOtp(otpCode: string): Observable<any> {
    return this.http.get(this.local_apiUrl + `Vertical/VerifyOtp?otpCode=${otpCode}`);
  }
  fetchAllData(): Observable<any> {
    return this.http.get(this.local_apiUrl+`Vertical/fetch-combined-data`);
  }
  fetchCheckInLogs(employeeId: string): Observable<any> {
    return this.http.get(this.local_apiUrl + `Vertical/GetEmployeeLogs?employeeId=${employeeId}`);
  }
  fetchCheckInLogsVisitors(employeeId: string): Observable<any> {
    return this.http.get(this.local_apiUrl + `Vertical/GetEmployeeLogsVisitors?employeeId=${employeeId}`);
  }
  getEmployeeCheckIns(): Observable<any> {
    return this.http.get(this.local_apiUrl + `Vertical/check-ins`);
  }
  getefficiencyOvertime(): Observable<any> {
    return this.http.get(this.local_apiUrl + `Vertical/average-wait-time`);
  }
}
