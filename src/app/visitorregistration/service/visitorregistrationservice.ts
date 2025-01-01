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
export class VisitorRegistrationService {
    private apiUrl = environment.apiUrl;           
    private local_apiUrl = environment.localApiUrl;

  constructor(private http: HttpClient) {}

  
  getVisitorRegistrationDetails(): Observable<any> {
    return this.http.get(this.apiUrl+"SalesTrax/GetVisitorRegistration"); // Adjust the endpoint as needed
  }
  postVisitorRegistration(moduleModel:any): Observable<any> {
    return this.http.post(this.apiUrl+"SalesTrax/CreateVisitorRegistration",moduleModel); // Adjust the endpoint as needed
  }
  getTenantDetails(): Observable<any> {
    return this.http.get(this.apiUrl+"SalesTrax/GetApps"); // Adjust the endpoint as needed
  }
}
