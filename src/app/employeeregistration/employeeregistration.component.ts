import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateEmployee, CreateEmployeeRegistrationModel } from '../models/CreateEmployeeRegistrationModel';
import { EmployeeRegistrationService } from './service/employeeregistrationservice';
import { ToastService } from '../service/toast.service';
import { Router } from '@angular/router';
import { DataService } from '../service/DataService';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-employeeregistration',
  templateUrl: './employeeregistration.component.html',
  styleUrl: './employeeregistration.component.css'
})
export class EmployeeregistrationComponent {
  // Date range property
  isLoading: boolean = false;
  rsp_apps: any;
  tenantNames: { id: number; name: string; is_active: boolean }[] = [];
  // Files selected for CNIC and Picture
  cnicImageFile: File | null = null;
  employeePictureFile: File | null = null;
  miscFile: File | null = null;
  constructor(private toastService: ToastService, private employeeService: EmployeeRegistrationService, private router: Router, private dataService: DataService) { }

  customerFormState: CreateEmployeeRegistrationModel = {
    EmployeeName: '',
    ContactNumber: '',
    Email: '',
    CNIC: '',
    Address: '',
    EmployeeCNICImage: '',
    EmployeePictureImage: '',
    dateRange: '',
    startDate: undefined,
    endDate: undefined
  };
  ngOnInit(): void {
   
    this.fetchTenantNames();
  }
  fetchTenantNames() {
    this.employeeService.getTenantDetails().subscribe(
      (response) => {
        if (response) {
          this.tenantNames = response;
        }
      },
      (error) => {
        this.toastService.showError('Error retrieving tenant details: ' + error.error.toString());
      }
    );
  }
  // onFileSelect(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     if (input.name === 'cnicImage') {
  //       this.cnicImageFile = input.files[0];
  //     } else if (input.name === 'employeePicture') {
  //       this.employeePictureFile = input.files[0];
  //     }
  //     else if (input.name === 'miscImage') {
  //       this.miscFile = input.files[0];
  //     }
  //   }
  // }

  onFileSelect(event: any, fileType: string): void {
    const file = event.target.files[0];
    if (fileType === 'cnic') {
        this.cnicImageFile = file;
    } else if (fileType === 'employee') {
        this.employeePictureFile = file;
    } else if (fileType === 'misc') {
        this.miscFile = file;
    }
}

  formatCnic() {
    const input = this.customerFormState.CNIC.replace(/\D/g, ''); // Remove non-digit characters
    if (input.length <= 5) {
      this.customerFormState.CNIC = input;
    } else if (input.length <= 12) {
      this.customerFormState.CNIC = `${input.slice(0, 5)}-${input.slice(5, 12)}`;
    } else if (input.length <= 13) {
      this.customerFormState.CNIC = `${input.slice(0, 5)}-${input.slice(5, 12)}-${input.slice(12, 13)}`;
    }
  }
  onSubmit(form: any): void {
    if (form.valid) {
      this.isLoading = true;
      
      const formData = new FormData();

      // Append each field to the FormData object
      formData.append('EmployeeName', form.value.employeeName);
      formData.append('ContactNumber', form.value.contactNumber);
      formData.append('OfficialEmailAddress', form.value.email); // Matches the C# property
      formData.append('CNIC', form.value.cnic);
      formData.append('PermanentAddress', form.value.permanentAddress);
      
      // Use DatePipe to format dates before appending
      const datePipe = new DatePipe('en-US');
      formData.append('StartDate', datePipe.transform(form.value.startDate, 'yyyy-MM-dd') || '');
      formData.append('EndDate', datePipe.transform(form.value.endDate, 'yyyy-MM-dd') || '');
      
      // Append files if present
      if (this.cnicImageFile) {
        formData.append('CNICImage', this.cnicImageFile);
      }
      formData.append('CNICPath', form.value.cnicImage);
      
      if (this.employeePictureFile) {
        formData.append('EmployeePicture', this.employeePictureFile);
      }
      formData.append('EmployeePath', form.value.employeePicture);
      
      if (this.miscFile) {
        formData.append('MiscImage', this.miscFile);
      }
      formData.append('MiscPath', form.value.miscImage);
      
      // Append TenantId with a default value
      formData.append('TenantId', '1');
      debugger;
      this.employeeService.postEmployeeRegistration(formData).subscribe(
        (response) => {
          if (response) {
            setTimeout(() => {
             
            }, 2000);
            this.toastService.showSuccess('Employee registered successfully!');
            form.resetForm(); // Reset the form after success
          
            this.cnicImageFile = null;
            this.employeePictureFile = null;
            this.isLoading = false;
          }
        },
        (error) => {
          this.isLoading = false;
          this.toastService.showSuccess('Employee registered successfully!');
          form.resetForm();
          this.cnicImageFile = null;
          this.employeePictureFile = null;
          
        }
      );
    }
  }
}