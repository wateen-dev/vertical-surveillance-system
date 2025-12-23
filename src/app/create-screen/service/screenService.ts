import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Lov } from '../../lov-manager/lov-manager.component';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { debug } from 'console';
import Hls from 'hls.js';
import { AuthService } from '../../service/auth.service';
// Adjust the path as needed


@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  private apiUrl = environment.apiUrl;
  private local_apiUrl = environment.localApiUrl;
  private ems_apiUrl = environment.emsApiUrl;

  constructor(private http: HttpClient,private authService: AuthService) { }


  getScreenDetails(): Observable<any> {

    return this.http.get(this.local_apiUrl + "Vertical/GetMiscCodes",this.authService.getAuthHeaders()); // Adjust the endpoint as needed
  }
  getAppDetails(): Observable<any> {
  
    return this.http.get(this.local_apiUrl + "SalesTrax/GetApps"); // Adjust the endpoint as needed
  }

  getModulesDetails(): Observable<any> {
    return this.http.get(this.local_apiUrl + "SalesTrax/GetModules"); // Adjust the endpoint as needed
  }
  getMatIcons(): Observable<any> {
    return this.http.get(this.local_apiUrl + "SalesTrax/GetIcons"); // Adjust the endpoint as needed
  }
  postScreenDetails(screenModel: any): Observable<any> {
    return this.http.post(this.ems_apiUrl + "SalesTrax/AddMiscCodes", screenModel); // Adjust the endpoint as needed
  }
  postModuleDetails(moduleModel: any): Observable<any> {
    return this.http.post(this.local_apiUrl + "SalesTrax/AddModules", moduleModel); // Adjust the endpoint as needed
  }
  //lov's

  getLOVs(): Observable<Lov[]> {
    return this.http.get<Lov[]>(this.ems_apiUrl + "SalesTrax/GetLOVs");
  }

  createLOV(lov: { name: string; value: string }): Observable<any> {
    return this.http.post(this.ems_apiUrl + "SalesTrax/CreateLOV", lov);
  }
  updateLOV(lov: Lov): Observable<any> {
    return this.http.put(this.ems_apiUrl + "SalesTrax/UpdateLOV", lov);
  }
}
