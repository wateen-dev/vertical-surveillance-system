import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}
interface Branch {
    branchId: number;
    branchName: string;
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
    constructor(private http: HttpClient) { }

    addBranch(branch: any): Observable<any> {
        return this.http.post(`${this.local_apiUrl}Branch/add-branch`, branch);
    }
    updateBranch(branch: Branch): Observable<any> {
        return this.http.put(`${this.local_apiUrl}Branch/update-branch`, branch);
    }
    getAllBranches(): Observable<ApiResponse<Branch[]>> {
        return this.http.get<ApiResponse<Branch[]>>(
            `${this.local_apiUrl}Branch/get-all-branches`
        );
    }
    deleteBranchStatus(branchId: number) {
        return this.http.put(
            `${this.local_apiUrl}Branch/update-branch-status/${branchId}`,
            {}
        );
    }
}
