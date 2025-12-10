import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}
interface ViolationCategory {
  categoryId: number;
  categoryName: string;
  isDeleted: boolean;
  createdOn: string;
  createdBy: string;
}
@Injectable({
    providedIn: 'root'
})
export class ViolationService {
    private apiUrl = environment.apiUrl;
    private local_apiUrl = environment.localApiUrl;
    constructor(private http: HttpClient) { }

    addCategory(violationcategory: any): Observable<any> {
        return this.http.post(`${this.local_apiUrl}ViolationCategory/add-category`, violationcategory);
    }
    updateCategory(violationcategory: ViolationCategory): Observable<any> {
        return this.http.put(`${this.local_apiUrl}ViolationCategory/update-category`, violationcategory);
    }
    getAllCategories(): Observable<ApiResponse<ViolationCategory[]>> {
        return this.http.get<ApiResponse<ViolationCategory[]>>(
            `${this.local_apiUrl}ViolationCategory/get-all-categories`
        );
    }
    deleteCategoryStatus(violationcategoryId: number) {
        return this.http.put(
            `${this.local_apiUrl}ViolationCategory/update-category-status/${violationcategoryId}`,
            {}
        );
    }
}
