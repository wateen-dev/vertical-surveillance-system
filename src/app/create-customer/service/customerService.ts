import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
 // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
    private apiUrl = environment.apiUrl;           
    private local_apiUrl = environment.localApiUrl;

  constructor(private http: HttpClient) {}
  getMatIcons(): Observable<any> {
    return this.http.get(environment.apiUrl+"SalesTrax/GetIcons"); // Adjust the endpoint as needed
  }
  postScreenDetails(screenModel:any): Observable<any> {
    return this.http.post(environment.apiUrl+"SalesTrax/AddMiscCodes",screenModel); // Adjust the endpoint as needed
  }
}
