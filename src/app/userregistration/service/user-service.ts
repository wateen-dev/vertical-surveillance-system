import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { AuthService } from '../../service/auth.service'; // adjust path

@Injectable({
  providedIn: 'root'
})
export class UserService {
 private apiUrl = environment.apiUrl;           
     private local_apiUrl = environment.localApiUrl;
  constructor(private http: HttpClient,private authService: AuthService) {}

   registerUser(user: any): Observable<any> {
    return this.http.post(
      `${this.local_apiUrl}User/register`,
      user,
      this.authService.getAuthHeaders() // <-- send JWT token
    );
  }
}
