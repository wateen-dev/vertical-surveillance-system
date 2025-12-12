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
import { AuthService } from '../../service/auth.service';
@Injectable({
  providedIn: 'root'
})
export class VisitorRegistrationService {
  private apiUrl = environment.apiUrl;
  private local_apiUrl = environment.localApiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }


  getVisitorRegistrationDetails(): Observable<any> {
    return this.http.get(this.apiUrl + "SalesTrax/GetVisitorRegistration"); // Adjust the endpoint as needed
  }
  postVisitorRegistration(visitor: any): Observable<any> {
    return this.http.post(
      this.local_apiUrl + "Vertical/add-visitor",
      visitor,
      this.authService.getAuthHeaders() // includes 'Authorization' header
    );
  }

  getTenantDetails(): Observable<any> {
    return this.http.get(this.local_apiUrl + "Vertical/fetch-tenant", this.authService.getAuthHeaders()); // unchanged
  }
}
