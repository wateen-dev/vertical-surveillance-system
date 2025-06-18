import { Component } from '@angular/core';
import { ToastService } from '../service/toast.service';
import { EmployeeRegistrationService } from '../employeeregistration/service/employeeregistrationservice';
import { Router } from '@angular/router';
import { DataService } from '../service/DataService';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-receptionist-management',
  templateUrl: './receptionist-management.component.html',
  styleUrls: ['./receptionist-management.component.scss'],
})
export class ReceptionistManagementComponent {
  otp: string = '';
  employee: any = null;
 private apiUrl = environment.apiUrl;           
    private local_apiUrl = environment.localApiUrl;
    imagePath1Base64:any;
constructor(private toastService: ToastService, private employeeService: EmployeeRegistrationService,private http: HttpClient, private router: Router, private dataService: DataService) { }
  // Example function to search OTP
  verifyOtp(otpCode: string) {
    this.employeeService.verifyOtp(otpCode).subscribe(
      (response) => {
        if (response) {
          // Map the response to your component properties or local variables as needed
          this.employee = response;
          debugger
          this.fetchImages(this.employee.employeePath)
          console.log('Employee details:', this.employee);
        }
      },
      (error) => {
        this.toastService.showError('Error verifying OTP: ' + error.error.toString());
      }
    );
  }

  approveOTP() {
    // Handle OTP approval logic here
    console.log('OTP approved for', this.employee?.name);
  }

  fetchImages(path:any): void {
 
    debugger
        const fileName = path.split("\\").pop();
        
            this.http.get(this.local_apiUrl+`Vertical/GetImagesBase64?fileName=${fileName}`).subscribe((data:any) => {
           debugger;
              this.imagePath1Base64 = data.thumbnailBase64;
           
            },
              (error) => {
                console.error('Error fetching thumbnail:', error);
              }
            );
          }
}
