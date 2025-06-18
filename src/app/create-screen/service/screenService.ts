import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Lov } from '../../lov-manager/lov-manager.component';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { debug } from 'console';
import Hls from 'hls.js';
 // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
    private apiUrl = environment.apiUrl;           
    private local_apiUrl = environment.localApiUrl;

  constructor(private http: HttpClient) {}

  
  getScreenDetails(): Observable<any> {
    return this.http.get(this.local_apiUrl+"Vertical/GetMiscCodes"); // Adjust the endpoint as needed
  }
  getAppDetails(): Observable<any> {
    return this.http.get(this.apiUrl+"SalesTrax/GetApps"); // Adjust the endpoint as needed
  }
  
  getModulesDetails(): Observable<any> {
    return this.http.get(this.apiUrl+"SalesTrax/GetModules"); // Adjust the endpoint as needed
  }
  getMatIcons(): Observable<any> {
    return this.http.get(this.apiUrl+"SalesTrax/GetIcons"); // Adjust the endpoint as needed
  }
  postScreenDetails(screenModel:any): Observable<any> {
    return this.http.post(this.apiUrl+"SalesTrax/AddMiscCodes",screenModel); // Adjust the endpoint as needed
  }
  postModuleDetails(moduleModel:any): Observable<any> {
    return this.http.post(this.apiUrl+"SalesTrax/AddModules",moduleModel); // Adjust the endpoint as needed
  }
  //lov's
  
  getLOVs(): Observable<Lov[]> {
    return this.http.get<Lov[]>(this.apiUrl + "SalesTrax/GetLOVs");
  }
  
  createLOV(lov: { name: string; value: string }): Observable<any> {
    return this.http.post(this.apiUrl + "SalesTrax/CreateLOV", lov); 
  }
  updateLOV(lov: Lov): Observable<any> {
    return this.http.put(this.apiUrl + "SalesTrax/UpdateLOV", lov);
  }


  //private baseUrl = 'https://graph.microsoft.com/v1.0/sites/f47eec58-0179-479e-8df9-ff3b409f5ef1/lists/af90ea47-f694-49a3-aa47-d467575b75d8/items';
  private baseUrl = 'https://graph.microsoft.com/v1.0/sites/f47eec58-0179-479e-8df9-ff3b409f5ef1/lists/af90ea47-f694-49a3-aa47-d467575b75d8/items/671/driveItem/content';
  private chunkSize = 1048576;  // 1MB per chunk
  private currentByte = 0;
  private totalBytes = 0;
  getSharePointDetails(): Observable<any> {

    let allItems: any[] = [];
    let nextLink: string | null = this.baseUrl;  // Initial URL
    
    const bearerToken = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6Ii1MLV9vVWZDTHJrUXJOdVh4NnVKTThacThYOGNlVXAxbERBTTFYYXJSWVEiLCJhbGciOiJSUzI1NiIsIng1dCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCIsImtpZCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mNTFkZWRkMi0wNmIwLTQ5ZmYtODMyYi1lYTIyOTI4OGEzYzIvIiwiaWF0IjoxNzMzMzA4NTIwLCJuYmYiOjE3MzMzMDg1MjAsImV4cCI6MTczMzMxMjQyMCwiYWlvIjoiazJCZ1lOQS96T21kZXUzcTFZNVNYWTZ6UlJ1VEFRPT0iLCJhcHBfZGlzcGxheW5hbWUiOiJNaWNyb3NvZnRHcmFwaEFQSSIsImFwcGlkIjoiNmYzYjk1NDYtNDVlYy00OTYyLWJiZGItNGU5NDVkMTc4YmEyIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZjUxZGVkZDItMDZiMC00OWZmLTgzMmItZWEyMjkyODhhM2MyLyIsImlkdHlwIjoiYXBwIiwib2lkIjoiNzNiYzNiNzctMDI5Mi00NTMxLWI3NmQtMWE5OTUwYmJmZjMzIiwicmgiOiIxLkFUa0EwdTBkOWJBR18wbURLLW9pa29pandnTUFBQUFBQUFBQXdBQUFBQUFBQUFBNUFBQTVBQS4iLCJyb2xlcyI6WyJTaXRlcy5TZWxlY3RlZCIsIkNhbGVuZGFycy5SZWFkIiwiR3JvdXAuUmVhZC5BbGwiLCJUYXNrcy5SZWFkLkFsbCIsIkNhbGVuZGFycy5SZWFkV3JpdGUiXSwic3ViIjoiNzNiYzNiNzctMDI5Mi00NTMxLWI3NmQtMWE5OTUwYmJmZjMzIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkVVIiwidGlkIjoiZjUxZGVkZDItMDZiMC00OWZmLTgzMmItZWEyMjkyODhhM2MyIiwidXRpIjoiaUZYcmxpZWpLMENFYlR1M2pod0hBUSIsInZlciI6IjEuMCIsIndpZHMiOlsiMDk5N2ExZDAtMGQxZC00YWNiLWI0MDgtZDVjYTczMTIxZTkwIl0sInhtc19pZHJlbCI6IjcgMjIiLCJ4bXNfdGNkdCI6MTU2MTM3MTgxMH0.ekSZkvHtibZzgXrmSskuHhWo3EDqbdYjGnzpdWm1Ib3hYR6kHP5he0REshbhXd1WSYNMwmhzAza0IRzANSPNAa_8LXt4lTzURzPYFs_Dx2_expAR5d-l1N0K0FuinCaITd_glVBKUpTQ4r48asDn597uj50-IAUkJgcLUt1_9eya9wFoByGiZsnjs7DDVfXKqyt_cNBEp1haNotzbOCj-DHuJYrNhfkEPxMnqK81y1EGPGgw6VpiO-ZHvPq_GONRKgZO13dQBo2fYG-uR3lvoDOtEobZC9HqkPsBVF1LG0DNh0CwbRSSiJh1ukcQQWkAKfpB1ng-VBKnBaj7Xwo5kQ'; // Replace with actual token retrieval logic

    // Set the Authorization header with the Bearer token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`);

   // Create an observable that fetches all pages
   return new Observable((observer) => {
     const fetchData = (url: string): Observable<any[]> => {
       return this.http.get(url, { headers }).pipe(
         switchMap((response: any) => {
           // Push the current page of data into the allItems array
           allItems = allItems.concat(response.value);
           
           // If there is a nextLink, recursively fetch the next page
           if (response['@odata.nextLink']) {
             return fetchData(response['@odata.nextLink']);  // Return observable of the next page
           } else {
             // No nextLink, return the accumulated items as an observable
             return of(allItems);  // Ensuring it returns an observable
           }
         }),
         catchError((error) => {
           // Handle errors and return an empty array
           observer.error('Error fetching data: ' + error);
           return of([]);  // Return empty array on error
         })
       );
     };

     fetchData(nextLink!).subscribe({
       next: (data: any[]) => {
         if (data.length) {
           observer.next(data);  // Emit the final array of data
         }
       },
       error: (err) => {
         observer.error('Error fetching data: ' + err);  // Emit error if any
       },
       complete: () => {
         observer.complete();  // Mark the observable as complete
       }
     });
   });
 }

//  getSharePointVideo(): Observable<Blob> {
//   debugger
//   const allChunks: any[] = [];
//   let currentByte = 0;  // Start from the beginning of the file
//   const bearerToken = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6IlZOTFoxX2hvVW1vTy1ORFFINHRrekZyaXZwbEpwR2twZ3BJdk1XMl82T2siLCJhbGciOiJSUzI1NiIsIng1dCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCIsImtpZCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mNTFkZWRkMi0wNmIwLTQ5ZmYtODMyYi1lYTIyOTI4OGEzYzIvIiwiaWF0IjoxNzMzMzMzOTQ1LCJuYmYiOjE3MzMzMzM5NDUsImV4cCI6MTczMzMzNzg0NSwiYWlvIjoiazJCZ1lPQ1FUanE1Z2svbTRsWWo1ZllGcGh0ZEFRPT0iLCJhcHBfZGlzcGxheW5hbWUiOiJNaWNyb3NvZnRHcmFwaEFQSSIsImFwcGlkIjoiNmYzYjk1NDYtNDVlYy00OTYyLWJiZGItNGU5NDVkMTc4YmEyIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZjUxZGVkZDItMDZiMC00OWZmLTgzMmItZWEyMjkyODhhM2MyLyIsImlkdHlwIjoiYXBwIiwib2lkIjoiNzNiYzNiNzctMDI5Mi00NTMxLWI3NmQtMWE5OTUwYmJmZjMzIiwicmgiOiIxLkFUa0EwdTBkOWJBR18wbURLLW9pa29pandnTUFBQUFBQUFBQXdBQUFBQUFBQUFBNUFBQTVBQS4iLCJyb2xlcyI6WyJTaXRlcy5TZWxlY3RlZCIsIkNhbGVuZGFycy5SZWFkIiwiR3JvdXAuUmVhZC5BbGwiLCJUYXNrcy5SZWFkLkFsbCIsIkNhbGVuZGFycy5SZWFkV3JpdGUiXSwic3ViIjoiNzNiYzNiNzctMDI5Mi00NTMxLWI3NmQtMWE5OTUwYmJmZjMzIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkVVIiwidGlkIjoiZjUxZGVkZDItMDZiMC00OWZmLTgzMmItZWEyMjkyODhhM2MyIiwidXRpIjoiakFBazNvc0huRWVhanZtMG1KQ0NBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiMDk5N2ExZDAtMGQxZC00YWNiLWI0MDgtZDVjYTczMTIxZTkwIl0sInhtc19pZHJlbCI6IjcgMjQiLCJ4bXNfdGNkdCI6MTU2MTM3MTgxMH0.HFU03KXurkVPdPdQpki2ac2mTJg0x3ZFOauit9ClAVtAAOFQRyRtQENk_-3ZOZIYE5oNuqiMmmHzhIvudmJEfhn-6fywmEBgzPGJ1i6ZHnGSCZmUgWPVxr_tEBa7VUPjyZg0KqfF3DW_1o9Z-GGFjc8mbMR7kfIQVQzKvHNwovYKbFullNeGhL_JWviHsNDIiEQb_yiE3HbcisGRKdFz1wDt5JrzVJ5kzmuiX6cdf2_yoTqXxQ0Im5eneefDPxbCzngxBm9cDyT7FdqM245rWUozaoavMW26-OyBZaJ0Ogf4q8RwZTAZxPlNVZjhwZ3qNIEjxM2VDa5fwsd15KIj5A';
//   // Set the Authorization header with the Bearer token
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`);

//   return new Observable(observer => {
//     const fetchChunk = (startByte: number): Observable<any> => {
//       // Set the Range header to download a specific chunk of the file
//       const rangeHeader = `bytes=${startByte}-${startByte + this.chunkSize - 1}`;
//       return this.http.get(this.baseUrl, {
//         headers: headers.set('Range', rangeHeader),
//         responseType: 'blob'
//       }).pipe(
//         switchMap((response: any) => {
//           // Store the current chunk data (you can save or process this as you need)
//           allChunks.push(response);

//           // Check if the chunk is less than the chunk size, meaning it's the last chunk
//           const contentRange = response.headers.get('Content-Range');
//           const totalSize = parseInt(contentRange?.split('/')[1] ?? '0', 10);

//           // If there's more to download, request the next chunk
//           if (startByte + this.chunkSize < totalSize) {
//             return fetchChunk(startByte + this.chunkSize);
//           } else {
//             // All chunks are fetched, combine them into a single Blob
//             const videoBlob = new Blob(allChunks, { type: 'video/mp4' });
//             // Emit the combined Blob (video)
//             return of(videoBlob);
//           }
//         }),
//         catchError((error) => {
//           observer.error('Error downloading video chunk: ' + error);
//           return of([]);  // Return empty array in case of error
//         })
//       );
//     };

//     // Start fetching the first chunk
//     fetchChunk(currentByte).subscribe({
//       next: (data: Blob) => {
//         if (data) {
//           observer.next(data);  // Emit the Blob representing the video
//         }
//       },
//       error: (err) => {
//         observer.error('Error fetching video: ' + err);  // Emit error if any
//       },
//       complete: () => {
//         observer.complete();  // Complete the observable
//       }
//     });
//   });
// }
//  getSharePointVideo(): Observable<any> {
//   const allChunks: any[] = [];
//   let currentByte = 0;  // Start from the beginning of the file
//   const bearerToken = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6Ik9SbHctUU9GYmF1ODNvT0lDMTNqWUpCOXVUM09IVXAxNkZCUU5nUFp5YW8iLCJhbGciOiJSUzI1NiIsIng1dCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCIsImtpZCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mNTFkZWRkMi0wNmIwLTQ5ZmYtODMyYi1lYTIyOTI4OGEzYzIvIiwiaWF0IjoxNzMzMzI5NTkxLCJuYmYiOjE3MzMzMjk1OTEsImV4cCI6MTczMzMzMzQ5MSwiYWlvIjoiazJCZ1lMRGVrKzFxMVJLc2NTUXA1bnJTZndrREFBPT0iLCJhcHBfZGlzcGxheW5hbWUiOiJNaWNyb3NvZnRHcmFwaEFQSSIsImFwcGlkIjoiNmYzYjk1NDYtNDVlYy00OTYyLWJiZGItNGU5NDVkMTc4YmEyIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZjUxZGVkZDItMDZiMC00OWZmLTgzMmItZWEyMjkyODhhM2MyLyIsImlkdHlwIjoiYXBwIiwib2lkIjoiNzNiYzNiNzctMDI5Mi00NTMxLWI3NmQtMWE5OTUwYmJmZjMzIiwicmgiOiIxLkFUa0EwdTBkOWJBR18wbURLLW9pa29pandnTUFBQUFBQUFBQXdBQUFBQUFBQUFBNUFBQTVBQS4iLCJyb2xlcyI6WyJTaXRlcy5TZWxlY3RlZCIsIkNhbGVuZGFycy5SZWFkIiwiR3JvdXAuUmVhZC5BbGwiLCJUYXNrcy5SZWFkLkFsbCIsIkNhbGVuZGFycy5SZWFkV3JpdGUiXSwic3ViIjoiNzNiYzNiNzctMDI5Mi00NTMxLWI3NmQtMWE5OTUwYmJmZjMzIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkVVIiwidGlkIjoiZjUxZGVkZDItMDZiMC00OWZmLTgzMmItZWEyMjkyODhhM2MyIiwidXRpIjoiUGNsQ3FRYVdPRUNUOUFpcnJKQVRBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiMDk5N2ExZDAtMGQxZC00YWNiLWI0MDgtZDVjYTczMTIxZTkwIl0sInhtc19pZHJlbCI6IjcgMjQiLCJ4bXNfdGNkdCI6MTU2MTM3MTgxMH0.KsH5HqAVxyZpAUFrn1A0T63AGQ3XE9sg2P8RFPdNe2R6QNV5RcobfaJe0EY_g52U_D1gKXTDavtr9JfIntkd1VJRxwL5clT_lsw_SuWrQXu7iBEOvde2fENsxwxYjTUS4aHZUvcMVkrWm5RuCGp5Je95S2TkbqmtnZv3RyFMv9KhImQMDwEiFvZ8wxGq2WMd6-rB48ztfqd9JXHtlg7raTujFW1b2J18Kqylpoj0Chezutm9ykYQTxxlJEHu1QQpJ54l81HGtgmZcD-38ngYfB4twi3HifuiBcMrHStBJUGEgcgYBIgdkr4GYkgD9a22Rp91XgskPTsvxI8qmgro2A'; // Replace with actual token

//   // Set the Authorization header with the Bearer token
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`);

//   return new Observable(observer => {
//     const fetchChunk = (startByte: number): Observable<any> => {
//       // Set the Range header to download a specific chunk of the file
//       const rangeHeader = `bytes=${startByte}-${startByte + this.chunkSize - 1}`;
//       return this.http.get(this.baseUrl, {
//         headers: headers.set('Range', rangeHeader),
//         responseType: 'blob'
//       }).pipe(
//         switchMap((response: any) => {
//           // Store the current chunk data (you can save or process this as you need)
//           allChunks.push(response);

//           // Check if the chunk is less than the chunk size, meaning it's the last chunk
//           const contentRange = response.headers.get('Content-Range');
//           const totalSize = parseInt(contentRange?.split('/')[1] ?? '0', 10);

//           // If there's more to download, request the next chunk
//           if (startByte + this.chunkSize < totalSize) {
//             return fetchChunk(startByte + this.chunkSize);
//           } else {
//             // All chunks are fetched, emit the combined data (you can process this data as needed)
//             return of(allChunks);
//           }
//         }),
//         catchError((error) => {
//           observer.error('Error downloading video chunk: ' + error);
//           return of([]);  // Return empty array in case of error
//         })
//       );
//     };

//     // Start fetching the first chunk
//     fetchChunk(currentByte).subscribe({
//       next: (data) => {
//         if (data.length) {
//           observer.next(data);  // Emit the fetched data
//         }
//       },
//       error: (err) => {
//         observer.error('Error fetching video: ' + err);  // Emit error if any
//       },
//       complete: () => {
//         observer.complete();  // Complete the observable
//       }
//     });
//   });
// }
// getSharePointVideo(): Observable<Blob> {
//   const allChunks: any[] = [];
//   let currentByte = 0;  // Start from the beginning of the file
// const bearerToken = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6IlZOTFoxX2hvVW1vTy1ORFFINHRrekZyaXZwbEpwR2twZ3BJdk1XMl82T2siLCJhbGciOiJSUzI1NiIsIng1dCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCIsImtpZCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mNTFkZWRkMi0wNmIwLTQ5ZmYtODMyYi1lYTIyOTI4OGEzYzIvIiwiaWF0IjoxNzMzMzMzOTQ1LCJuYmYiOjE3MzMzMzM5NDUsImV4cCI6MTczMzMzNzg0NSwiYWlvIjoiazJCZ1lPQ1FUanE1Z2svbTRsWWo1ZllGcGh0ZEFRPT0iLCJhcHBfZGlzcGxheW5hbWUiOiJNaWNyb3NvZnRHcmFwaEFQSSIsImFwcGlkIjoiNmYzYjk1NDYtNDVlYy00OTYyLWJiZGItNGU5NDVkMTc4YmEyIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZjUxZGVkZDItMDZiMC00OWZmLTgzMmItZWEyMjkyODhhM2MyLyIsImlkdHlwIjoiYXBwIiwib2lkIjoiNzNiYzNiNzctMDI5Mi00NTMxLWI3NmQtMWE5OTUwYmJmZjMzIiwicmgiOiIxLkFUa0EwdTBkOWJBR18wbURLLW9pa29pandnTUFBQUFBQUFBQXdBQUFBQUFBQUFBNUFBQTVBQS4iLCJyb2xlcyI6WyJTaXRlcy5TZWxlY3RlZCIsIkNhbGVuZGFycy5SZWFkIiwiR3JvdXAuUmVhZC5BbGwiLCJUYXNrcy5SZWFkLkFsbCIsIkNhbGVuZGFycy5SZWFkV3JpdGUiXSwic3ViIjoiNzNiYzNiNzctMDI5Mi00NTMxLWI3NmQtMWE5OTUwYmJmZjMzIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkVVIiwidGlkIjoiZjUxZGVkZDItMDZiMC00OWZmLTgzMmItZWEyMjkyODhhM2MyIiwidXRpIjoiakFBazNvc0huRWVhanZtMG1KQ0NBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiMDk5N2ExZDAtMGQxZC00YWNiLWI0MDgtZDVjYTczMTIxZTkwIl0sInhtc19pZHJlbCI6IjcgMjQiLCJ4bXNfdGNkdCI6MTU2MTM3MTgxMH0.HFU03KXurkVPdPdQpki2ac2mTJg0x3ZFOauit9ClAVtAAOFQRyRtQENk_-3ZOZIYE5oNuqiMmmHzhIvudmJEfhn-6fywmEBgzPGJ1i6ZHnGSCZmUgWPVxr_tEBa7VUPjyZg0KqfF3DW_1o9Z-GGFjc8mbMR7kfIQVQzKvHNwovYKbFullNeGhL_JWviHsNDIiEQb_yiE3HbcisGRKdFz1wDt5JrzVJ5kzmuiX6cdf2_yoTqXxQ0Im5eneefDPxbCzngxBm9cDyT7FdqM245rWUozaoavMW26-OyBZaJ0Ogf4q8RwZTAZxPlNVZjhwZ3qNIEjxM2VDa5fwsd15KIj5A';

//   // Set the Authorization header with the Bearer token
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`);

//   return new Observable(observer => {
//     const fetchChunk = (startByte: number): Observable<any> => {
//       // Set the Range header to download a specific chunk of the file
//       const rangeHeader = `bytes=${startByte}-${startByte + this.chunkSize - 1}`;
//       return this.http.get(this.baseUrl, {
//         headers: headers.set('Range', rangeHeader),
//         responseType: 'blob'
//       }).pipe(
//         switchMap((response: any) => {
//           // Store the current chunk data (you can save or process this as you need)
//           allChunks.push(response);

//           // Check if the chunk is less than the chunk size, meaning it's the last chunk
//           const contentRange = response.headers.get('Content-Range');
//           const totalSize = parseInt(contentRange?.split('/')[1] ?? '0', 10);

//           // If there's more to download, request the next chunk
//           if (startByte + this.chunkSize < totalSize) {
//             return fetchChunk(startByte + this.chunkSize);
//           } else {
//             // All chunks are fetched, combine them into a single Blob
//             const videoBlob = new Blob(allChunks, { type: 'video/mp4' });
//             // Emit the combined Blob (video)
//             return of(videoBlob);
//           }
//         }),
//         catchError((error) => {
//           console.error('Error downloading video chunk:', error); // Log the error
//           observer.error('Error downloading video chunk: ' + error.message || error);  // Emit error with details
//           return of([]);  // Return empty array in case of error
//         })
//       );
//     };

//     // Start fetching the first chunk
//     fetchChunk(currentByte).subscribe({
//       next: (data: Blob) => {
//         if (data) {
//           observer.next(data);  // Emit the Blob representing the video
//         }
//       },
//       error: (err) => {
//         observer.error('Error fetching video: ' + err);  // Emit error if any
//       },
//       complete: () => {
//         observer.complete();  // Complete the observable
//       }
//     });
//   });
// }
// getSharePointVideo(): Observable<Blob> {
//   const allChunks: any[] = [];
//   let currentByte = 0;  // Start from the beginning of the file
//   const bearerToken = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6IlZOTFoxX2hvVW1vTy1ORFFINHRrekZyaXZwbEpwR2twZ3BJdk1XMl82T2siLCJhbGciOiJSUzI1NiIsIng1dCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCIsImtpZCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mNTFkZWRkMi0wNmIwLTQ5ZmYtODMyYi1lYTIyOTI4OGEzYzIvIiwiaWF0IjoxNzMzMzMzOTQ1LCJuYmYiOjE3MzMzMzM5NDUsImV4cCI6MTczMzMzNzg0NSwiYWlvIjoiazJCZ1lPQ1FUanE1Z2svbTRsWWo1ZllGcGh0ZEFRPT0iLCJhcHBfZGlzcGxheW5hbWUiOiJNaWNyb3NvZnRHcmFwaEFQSSIsImFwcGlkIjoiNmYzYjk1NDYtNDVlYy00OTYyLWJiZGItNGU5NDVkMTc4YmEyIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZjUxZGVkZDItMDZiMC00OWZmLTgzMmItZWEyMjkyODhhM2MyLyIsImlkdHlwIjoiYXBwIiwib2lkIjoiNzNiYzNiNzctMDI5Mi00NTMxLWI3NmQtMWE5OTUwYmJmZjMzIiwicmgiOiIxLkFUa0EwdTBkOWJBR18wbURLLW9pa29pandnTUFBQUFBQUFBQXdBQUFBQUFBQUFBNUFBQTVBQS4iLCJyb2xlcyI6WyJTaXRlcy5TZWxlY3RlZCIsIkNhbGVuZGFycy5SZWFkIiwiR3JvdXAuUmVhZC5BbGwiLCJUYXNrcy5SZWFkLkFsbCIsIkNhbGVuZGFycy5SZWFkV3JpdGUiXSwic3ViIjoiNzNiYzNiNzctMDI5Mi00NTMxLWI3NmQtMWE5OTUwYmJmZjMzIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkVVIiwidGlkIjoiZjUxZGVkZDItMDZiMC00OWZmLTgzMmItZWEyMjkyODhhM2MyIiwidXRpIjoiakFBazNvc0huRWVhanZtMG1KQ0NBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiMDk5N2ExZDAtMGQxZC00YWNiLWI0MDgtZDVjYTczMTIxZTkwIl0sInhtc19pZHJlbCI6IjcgMjQiLCJ4bXNfdGNkdCI6MTU2MTM3MTgxMH0.HFU03KXurkVPdPdQpki2ac2mTJg0x3ZFOauit9ClAVtAAOFQRyRtQENk_-3ZOZIYE5oNuqiMmmHzhIvudmJEfhn-6fywmEBgzPGJ1i6ZHnGSCZmUgWPVxr_tEBa7VUPjyZg0KqfF3DW_1o9Z-GGFjc8mbMR7kfIQVQzKvHNwovYKbFullNeGhL_JWviHsNDIiEQb_yiE3HbcisGRKdFz1wDt5JrzVJ5kzmuiX6cdf2_yoTqXxQ0Im5eneefDPxbCzngxBm9cDyT7FdqM245rWUozaoavMW26-OyBZaJ0Ogf4q8RwZTAZxPlNVZjhwZ3qNIEjxM2VDa5fwsd15KIj5A';


//   // Set the Authorization header with the Bearer token
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`);

//   return new Observable(observer => {
//     const fetchChunk = (startByte: number): Observable<any> => {
//       // Set the Range header to download a specific chunk of the file
//       const rangeHeader = `bytes=${startByte}-${startByte + this.chunkSize - 1}`;
//       return this.http.get(this.baseUrl, {
//         headers: headers.set('Range', rangeHeader),
//         responseType: 'blob',
//         observe: 'response'  // This is necessary to get the full response, including headers
//       }).pipe(
//         switchMap((response: any) => {
//           console.log('Response Headers:', response.headers);  // Log headers for debugging
//           // Store the current chunk data (you can save or process this as you need)
//           allChunks.push(response.body);  // Use `response.body` for blob content
//           // Check if the Content-Range header exists and is valid
//           const contentRange = response.headers.get('Content-Range');
//           if (contentRange) {
//             const totalSize = parseInt(contentRange.split('/')[1], 10);

//             // If there's more to download, request the next chunk
//             if (startByte + this.chunkSize < totalSize) {
//               return fetchChunk(startByte + this.chunkSize);
//             } else {
//               // All chunks are fetched, combine them into a single Blob
//               const videoBlob = new Blob(allChunks, { type: 'video/mp4' });
//               // Emit the combined Blob (video)
//               return of(videoBlob);
//             }
//           } else {
//             observer.error('Content-Range header missing or invalid');
//             return of([]);  // Return empty array on error
//           }
//         }),
//         catchError((error) => {
//           debugger
//           console.error('Error downloading video chunk:', error);
//           console.log('Response Body:', error.response.body);  // Log the response body for debugging
//           observer.error('Error downloading video chunk: ' + (error.message || 'Unknown error'));
//           return of([]);  // Return empty array in case of error
//         })
//       );
//     };

//     // Start fetching the first chunk
//     fetchChunk(currentByte).subscribe({
//       next: (data: Blob) => {
//         if (data) {
//           observer.next(data);  // Emit the Blob representing the video
//         }
//       },
//       error: (err) => {
//         observer.error('Error fetching video: ' + err);  // Emit error if any
//       },
//       complete: () => {
//         observer.complete();  // Complete the observable
//       }
//     });
//   });
// }


/*Test*/



// getSharePointVideo(): Observable<string> {
//   return new Observable<string>((observer) => {
//     // Check if HLS is supported in the browser
//     const video = document.createElement('video');
//     const hls = new Hls();

//     if (Hls.isSupported()) {
//       // If HLS is supported, load the HLS stream (m3u8 playlist)
//       hls.loadSource('https://wateentelecomlimited.sharepoint.com/sites/employeeengagement/_layouts/15/download.aspx?UniqueId=4f68a590-81ef-44d7-a532-719c0dd03ecc&Translate=false&tempauth=v1.eyJzaXRlaWQiOiJmNDdlZWM1OC0wMTc5LTQ3OWUtOGRmOS1mZjNiNDA5ZjVlZjEiLCJhcHBfZGlzcGxheW5hbWUiOiJNaWNyb3NvZnRHcmFwaEFQSSIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC93YXRlZW50ZWxlY29tbGltaXRlZC5zaGFyZXBvaW50LmNvbUBmNTFkZWRkMi0wNmIwLTQ5ZmYtODMyYi1lYTIyOTI4OGEzYzIiLCJleHAiOiIxNzMzMzgyNzE1In0.CgoKBHNuaWQSAjY0EgsImsvhgbi_yj0QBRoMMjAuMjAuNDQuMTYwKixRRkhUZjF3OUdkSGt0cHNmV2svQlMwcy9yWHFDTUVpRzJ5UENlbGhjc3pVPTCcATgBQhChannx-vAAADVkKqT0bNQ7ShBoYXNoZWRwcm9vZnRva2VuegExugEYc2VsZWN0ZWRzaXRlcyBncm91cC5yZWFkwgFJNmYzYjk1NDYtNDVlYy00OTYyLWJiZGItNGU5NDVkMTc4YmEyQGY1MWRlZGQyLTA2YjAtNDlmZi04MzJiLWVhMjI5Mjg4YTNjMsgBAQ.UINx04I2QWDbVNInKF7bJ2gSZvdekXGu0Met3TFIupY&ApiVersion=2.0'); // Replace with the HLS stream URL
//       hls.attachMedia(video);

//       hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
//         console.log('HLS Manifest parsed', data);
//         observer.next('Video streaming with HLS is now ready.');
//       });

//       hls.on(Hls.Events.ERROR, (event, data) => {
//         console.error('HLS error', event, data);
//         observer.error('Error in HLS streaming.');
//       });

//       // Return the video URL once HLS is attached
//       observer.next(video.src);
//       observer.complete();

//     } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
//       // For Safari, which supports HLS natively
//       video.src = 'https://your-server-url/video.m3u8';  // Replace with the HLS stream URL
//       video.controls = true;
//       video.play();

//       observer.next(video.src);
//       observer.complete();

//     } else {
//       observer.error('HLS is not supported in this browser.');
//     }
//   });
// }





getSharePointVideo(): Observable<string> {
  const allChunks: any[] = [];
  let currentByte = 0; // Start from the beginning of the file
  const bearerToken = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6Ims0OHRnNXlaX0JET2Zaak5POFBLdkd0V29RYTVuYXVDemhPa0t0eVU0MDQiLCJhbGciOiJSUzI1NiIsIng1dCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCIsImtpZCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mNTFkZWRkMi0wNmIwLTQ5ZmYtODMyYi1lYTIyOTI4OGEzYzIvIiwiaWF0IjoxNzMzMzc4NDk2LCJuYmYiOjE3MzMzNzg0OTYsImV4cCI6MTczMzM4MjM5NiwiYWlvIjoiazJCZ1lMalNVMWY2Y1Y1WUQ4dlVMd1h6TnZxNUFnQT0iLCJhcHBfZGlzcGxheW5hbWUiOiJNaWNyb3NvZnRHcmFwaEFQSSIsImFwcGlkIjoiNmYzYjk1NDYtNDVlYy00OTYyLWJiZGItNGU5NDVkMTc4YmEyIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZjUxZGVkZDItMDZiMC00OWZmLTgzMmItZWEyMjkyODhhM2MyLyIsImlkdHlwIjoiYXBwIiwib2lkIjoiNzNiYzNiNzctMDI5Mi00NTMxLWI3NmQtMWE5OTUwYmJmZjMzIiwicmgiOiIxLkFUa0EwdTBkOWJBR18wbURLLW9pa29pandnTUFBQUFBQUFBQXdBQUFBQUFBQUFBNUFBQTVBQS4iLCJyb2xlcyI6WyJTaXRlcy5TZWxlY3RlZCIsIkNhbGVuZGFycy5SZWFkIiwiR3JvdXAuUmVhZC5BbGwiLCJUYXNrcy5SZWFkLkFsbCIsIkNhbGVuZGFycy5SZWFkV3JpdGUiXSwic3ViIjoiNzNiYzNiNzctMDI5Mi00NTMxLWI3NmQtMWE5OTUwYmJmZjMzIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkVVIiwidGlkIjoiZjUxZGVkZDItMDZiMC00OWZmLTgzMmItZWEyMjkyODhhM2MyIiwidXRpIjoiYzNlWEJJVHQ1RXllRDZxTzczRWhBUSIsInZlciI6IjEuMCIsIndpZHMiOlsiMDk5N2ExZDAtMGQxZC00YWNiLWI0MDgtZDVjYTczMTIxZTkwIl0sInhtc19pZHJlbCI6IjI0IDciLCJ4bXNfdGNkdCI6MTU2MTM3MTgxMH0.hfJXvcLfxg6OwJ0wdWV6PN4iqQxfgsGwX-tmNGBVYOpegJmnkQmyko0ezndJzPF7DwCdI_sKgPloEZsc6DkSh1yWB3qy5Md0qb9ntMTvtIYHkrjY2ZBa2GeCBeqPohecYmnkV0__Yl-IQxgHX1oOMtDe-ZKYPH4CfBiOVML-X8rloqaeHP5UEy5vyMUMCvi20IdQc52TeNktwT7qgTZXK4hiq4rS_xRLib6L1uu-KtsMmcOMUFvqEnxJspLqxg3VLEO6DjrUoxPWsKIR4-bsdw2kbon6hl83YgFlGa7rfYy2BkZepKuhuH8ek4n5Y-mxV_yOzIQuOwpIi7QN2wTCvg';
  const headers = new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`);
//   const headers = new HttpHeaders()
//   .set('Authorization', `Bearer ${bearerToken}`)
//   .set('Range', 'bytes=0-1'); // Request the first byte
// debugger
// this.http.get(this.baseUrl, { headers, observe: 'response', responseType: 'blob' }).subscribe({
//   next: (response) => {
//     debugger
//     const acceptRanges = response.headers.get('Content-Range') ? 'bytes' : 'none';
//     console.log('Accept-Ranges:', acceptRanges);
//   },
//   error: (error) => {
//     debugger
//     console.error('Error in GET request:', error);
//   }
// });
  


  
  return new Observable<string>((observer) => {
    const fetchChunk = (startByte: number): Observable<any> => {
      const rangeHeader = `bytes=${startByte}-${startByte + this.chunkSize - 1}`;
      return this.http.get(this.baseUrl, {
        headers: headers.set('Range', rangeHeader),
        responseType: 'blob',
        observe: 'response',
      }).pipe(
        switchMap((response: HttpResponse<Blob>) => {
          const contentRange = response.headers.get('Content-Range');
          if (contentRange) {
            const totalSize = parseInt(contentRange.split('/')[1], 10);
            allChunks.push(response.body); // Add chunk to the array

            // If there's more to fetch, recursively fetch the next chunk
            if (startByte + this.chunkSize < totalSize) {
              return fetchChunk(startByte + this.chunkSize);
            } else {
              // Combine all chunks into a single Blob
              const videoBlob = new Blob(allChunks, { type: 'video/mp4' });
              const videoUrl = URL.createObjectURL(videoBlob); // Create a Blob URL
              observer.next(videoUrl); // Emit the video URL
              observer.complete();
              return of(videoUrl);
            }
          } else {
            // Fallback to full file download if Content-Range is missing
            console.warn('Content-Range header is missing. Falling back to full file download.');
            return this.http.get(this.baseUrl, {
              headers,
              responseType: 'blob',
            }).pipe(
              switchMap((fullResponse: Blob) => {
                const fullVideoUrl = URL.createObjectURL(fullResponse); // Create a Blob URL
                observer.next(fullVideoUrl); // Emit the video URL
                observer.complete();
                return of(fullVideoUrl);
              })
            );
          }
        }),
        catchError((error) => {
          console.error('Error downloading video chunk:', error);
          observer.error('Error downloading video: ' + error.message);
          return of(null); // Gracefully handle errors
        })
      );
    };

    // Start by trying to fetch chunks
    fetchChunk(currentByte).subscribe({
      error: (err) => observer.error(err),
    });
  });
}

}
