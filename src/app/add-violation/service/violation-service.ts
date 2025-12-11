import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { AuthService } from '../../service/auth.service'; // adjust path

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
    constructor(private http: HttpClient, private authService: AuthService) { }

    addCategory(violationcategory: any): Observable<any> {
        return this.http.post(
            `${this.local_apiUrl}ViolationCategory/add-category`,
            violationcategory,
            this.authService.getAuthHeaders() // attach token
        );
    }

    updateCategory(violationcategory: ViolationCategory): Observable<any> {
        return this.http.put(
            `${this.local_apiUrl}ViolationCategory/update-category`,
            violationcategory,
            this.authService.getAuthHeaders() // attach token
        );
    }

    getAllCategories(): Observable<ApiResponse<ViolationCategory[]>> {
        return this.http.get<ApiResponse<ViolationCategory[]>>(
            `${this.local_apiUrl}ViolationCategory/get-all-categories`,
            this.authService.getAuthHeaders() // attach token
        );
    }

    deleteCategoryStatus(violationcategoryId: number) {
        return this.http.put(
            `${this.local_apiUrl}ViolationCategory/update-category-status/${violationcategoryId}`,
            {},
            this.authService.getAuthHeaders() // attach token
        );
    }
}