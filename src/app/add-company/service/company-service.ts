import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Camera } from 'plotly.js-dist-min';

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

  constructor(private http: HttpClient) { }

  addCompany(company: any): Observable<any> {
    return this.http.post(`${this.local_apiUrl}Company/add-company`, company);
  }
  updateCompany(company: Company): Observable<any> {
    return this.http.put(`${this.local_apiUrl}Company/update-company`, company);
  }

  getAllCompanies(): Observable<any> {  
    return this.http.get(`${this.local_apiUrl}Company/get-all-companies`);
  }

  deleteCompanyStatus(companyId: number): Observable<any> {
    return this.http.put(`${this.local_apiUrl}Company/update-company-status/${companyId}`,{});
  }
  
}
