import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { AuthService } from '../../service/auth.service'; // adjust path as needed

interface Company {
  companyId: number;
  companyName: string;
  industryType: string;
  isDeleted: boolean;
  createdOn: string;
  createdBy: string;
}
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = environment.apiUrl;
  private local_apiUrl = environment.localApiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

   addCompany(company: any): Observable<any> {
    return this.http.post(
      `${this.local_apiUrl}Company/add-company`,
      company,
      this.authService.getAuthHeaders()
    );
  }

  updateCompany(company: Company): Observable<any> {
    return this.http.put(
      `${this.local_apiUrl}Company/update-company`,
      company,
      this.authService.getAuthHeaders()
    );
  }

  getAllCompanies(): Observable<any> {  
    return this.http.get(
      `${this.local_apiUrl}Company/get-all-companies`,
      this.authService.getAuthHeaders()
    );
  }

  deleteCompanyStatus(companyId: number): Observable<any> {
    return this.http.put(
      `${this.local_apiUrl}Company/update-company-status/${companyId}`,
      {},
      this.authService.getAuthHeaders()
    );
  }
  getBranchesByCompany(companyId: number) {
  return this.http.get(
    `${this.local_apiUrl}Branch/get-branches-by-company/${companyId}`,
      this.authService.getAuthHeaders()
  );
}
}
