import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateEmployee, CreateEmployeeRegistrationModel } from '../models/CreateEmployeeRegistrationModel';
import { EmployeeRegistrationService } from './service/employeeregistrationservice';
import { ToastService } from '../service/toast.service';
import { Router } from '@angular/router';
import { DataService } from '../service/DataService';
import { DatePipe } from '@angular/common';
import { Console } from 'console';
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
    startDate:undefined,
    endDate: undefined
  };
  ngOnInit(): void {
   
    // this.fetchTenantNames();
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
  if (!form.valid) {
    this.toastService.showError('Please fill all required fields.');
    return;
  }

  this.isLoading = true;
  const formData = new FormData();

  // Required fields
  formData.append('EmployeeId', '0');
  formData.append('EmployeeName', form.value.employeeName || '');
  formData.append('TenantId', form.value.tenantId?.toString() || '1');
  formData.append('ContactNumber', form.value.contactNumber || '');
  formData.append('OfficialEmailAddress', form.value.email || '');
  formData.append('CNIC', form.value.cnic || '');
  formData.append('PermanentAddress', form.value.permanentAddress || '');

  // Dates
  const datePipe = new DatePipe('en-US');
  formData.append('StartDate', datePipe.transform(form.value.startDate, 'yyyy-MM-dd') || '');
  formData.append('EndDate', datePipe.transform(form.value.endDate, 'yyyy-MM-dd') || '');

  // Status default
  formData.append('Status', 'false');

  // Files
  if (this.cnicImageFile) {
    formData.append('CNICImage', this.cnicImageFile, this.cnicImageFile.name);
    formData.append('CNICPath', this.cnicImageFile.name);
  } else {
    formData.append('CNICPath', form.value.cnicImage || '');
  }

  if (this.employeePictureFile) {
    formData.append('EmployeePicture', this.employeePictureFile, this.employeePictureFile.name);
    formData.append('EmployeePath', this.employeePictureFile.name);
  } else {
    formData.append('EmployeePath', form.value.employeePicture || '');
  }

  if (this.miscFile) {
    formData.append('MiscImage', this.miscFile, this.miscFile.name);
    formData.append('MiscPath', this.miscFile.name);
  } else {
    formData.append('MiscPath', form.value.miscImage || '');
  }

  // Send to API
  this.employeeService.postEmployeeRegistration(formData).subscribe(
    (response: any) => {
      this.isLoading = false;
      if (response?.success) {
        this.toastService.showSuccess(response.message || 'Employee registered successfully!');
        console.log('Employee ID:', response.data?.employeeId);
        form.resetForm();
        this.cnicImageFile = null;
        this.employeePictureFile = null;
        this.miscFile = null;
      } else {
        this.toastService.showError(response?.message || 'Registration failed.');
      }
    },
    (error) => {
      this.isLoading = false;
      if (error.status === 400 && error.error?.errors) {
        const messages = Object.values(error.error.errors).flat().join('\n');
        this.toastService.showError(messages);
      } else {
        this.toastService.showError(error?.error?.message || 'Something went wrong!');
      }
    }
  );
}

}