import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
 // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class OpportunityService {
    private apiUrl = environment.apiUrl;           
    private local_apiUrl = environment.localApiUrl;

  constructor(private http: HttpClient) {}
  getMatIcons(): Observable<any> {
    return this.http.get(this.apiUrl+"SalesTrax/GetIcons"); // Adjust the endpoint as needed
  }
  postScreenDetails(screenModel:any): Observable<any> {
    return this.http.post(this.apiUrl+"SalesTrax/AddMiscCodes",screenModel); // Adjust the endpoint as needed
  }
}
