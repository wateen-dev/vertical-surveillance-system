import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Camera } from 'plotly.js-dist-min';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private apiUrl = environment.apiUrl;
  private local_apiUrl = environment.localApiUrl;

  constructor(private http: HttpClient) { }

  addCamera(camera: any): Observable<any> {
    return this.http.post(`${this.local_apiUrl}Camera/add-camera`, camera);
  }
  updateCamera(camera: Camera): Observable<any> {
    return this.http.put(`${this.local_apiUrl}Camera/update-camera`, camera);
  }

  getAllBranches(): Observable<any> {
    return this.http.get(`${this.local_apiUrl}Branch/get-all-branches`);
  }
  getAllCameras(): Observable<any> {
    return this.http.get(`${this.local_apiUrl}Camera/get-all-cameras`);
  }

  deleteCamera(cameraId: number): Observable<any> {
    return this.http.put(`${this.local_apiUrl}Camera/delete-camera/${cameraId}`,{});
  }
  
}
