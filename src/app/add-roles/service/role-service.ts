import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { AuthService } from '../../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private local_apiUrl = environment.localApiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  addRole(role: any): Observable<any> {
    return this.http.post(
      `${this.local_apiUrl}Roles/add`,
      role,
      this.authService.getAuthHeaders()
    );
  }

  updateRole(role: any): Observable<any> {
    
    return this.http.put(
      `${this.local_apiUrl}Roles/update`,
      role,
      this.authService.getAuthHeaders()
    );
  }

  getAllRoles(): Observable<any> {
    return this.http.get(
      `${this.local_apiUrl}Roles/get-all`,
      this.authService.getAuthHeaders()
    );
  }

  deleteRole(id: number): Observable<any> {
    return this.http.put(
      `${this.local_apiUrl}Roles/delete/${id}`,
      {},
      this.authService.getAuthHeaders()
    );
  }
}
