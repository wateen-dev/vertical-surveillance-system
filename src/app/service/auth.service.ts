import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLoginModel } from '../models/UserLoginModel';
import { environment } from '../../environment/environment';
import { DataService } from './DataService'; // your session service

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;           
  private local_apiUrl = environment.localApiUrl;

  constructor(private http: HttpClient, private dataService: DataService) {}

  // Login and save token + user info in DataService
  login(loginData: UserLoginModel): Observable<any> {
    return new Observable((observer) => {
      this.http.post<any>(this.local_apiUrl + "User/login", loginData).subscribe({
        next: (response) => {
          if (response?.token && response?.user) {
            const content = { ...response.user, token: response.token };
            this.dataService.setContent(content); // saves token + user with expiry
          }
          observer.next(response);
        },
        error: (err) => observer.error(err)
      });
    });
  }

  // Logout user
  logout(): void {
    this.dataService.clearContent();
  }

  // Get token for API calls
  getToken(): string | null {
    const userContent = this.dataService.getContent();
    return userContent?.token || null;
  }

  // Get headers for protected API calls
  getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.getToken() || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return { headers };
  }

  // Call protected API with token
  callProtectedApi(endpoint: string): Observable<any> {
    return this.http.get(this.local_apiUrl + endpoint, this.getAuthHeaders());
  }
}
