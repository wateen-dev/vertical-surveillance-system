import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { AuthService } from '../../service/auth.service'; // Adjust path as needed

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}
interface Branch {
    branchId: number;
    branchName: string;
    companyId: number;
    companyName: string;
    address: string;
    city: string;
    isDeleted: boolean;
    createdOn: string;
    createdBy: string;
}
@Injectable({
    providedIn: 'root'
})
export class BranchService {
    private apiUrl = environment.apiUrl;
    private local_apiUrl = environment.localApiUrl;
    constructor(private http: HttpClient,private authService: AuthService) { }

     addBranch(branch: any): Observable<any> {
    return this.http.post(
      `${this.local_apiUrl}Branch/add-branch`,
      branch,
      this.authService.getAuthHeaders() // attach token
    );
  }

  updateBranch(branch: Branch): Observable<any> {
    return this.http.put(
      `${this.local_apiUrl}Branch/update-branch`,
      branch,
      this.authService.getAuthHeaders() // attach token
    );
  }

  getAllBranches(): Observable<ApiResponse<Branch[]>> {
    return this.http.get<ApiResponse<Branch[]>>(
      `${this.local_apiUrl}Branch/get-all-branches`,
      this.authService.getAuthHeaders() // attach token
    );
  }

  deleteBranchStatus(branchId: number) {
    return this.http.put(
      `${this.local_apiUrl}Branch/update-branch-status/${branchId}`,
      {},
      this.authService.getAuthHeaders() // attach token
    );
  }

  getAllCompanies(): Observable<any> {
    return this.http.get(
      `${this.local_apiUrl}Company/get-all-companies`,
      this.authService.getAuthHeaders() // attach token
    );
  }
}
