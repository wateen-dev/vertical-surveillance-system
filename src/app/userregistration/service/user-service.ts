import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 private apiUrl = environment.apiUrl;           
     private local_apiUrl = environment.localApiUrl;
  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
   return this.http.post(this.local_apiUrl+"User/register",user);
  }
}
