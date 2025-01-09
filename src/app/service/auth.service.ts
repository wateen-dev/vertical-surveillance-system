import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLoginModel } from '../models/UserLoginModel'; // Adjust the path as needed
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;           
  private local_apiUrl = environment.localApiUrl;

  constructor(private http: HttpClient) {}

  // login(username: string, password: string):Observable<any> {
    
  //   const formData = new FormData();
  //   formData.append('Username', username);
  //   formData.append('Password', password);
  //   return this.http.post(this.apiUrl+"Auth/ADLogin", formData);
  // }
  login(loginData: UserLoginModel): Observable<any> {
    return this.http.post<any>(this.local_apiUrl+"User/login", loginData);
  }
  
  }
  

