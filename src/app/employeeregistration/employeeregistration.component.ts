import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateEmployee, CreateEmployeeRegistrationModel } from '../models/CreateEmployeeRegistrationModel';
import { EmployeeRegistrationService } from './service/employeeregistrationservice';
import { ToastService } from '../service/toast.service';
import { Router } from '@angular/router';
import { DataService } from '../service/DataService';
@Component({
  selector: 'app-employeeregistration',
  templateUrl: './employeeregistration.component.html',
  styleUrl: './employeeregistration.component.css'
})
export class EmployeeregistrationComponent {
  // Date range property
  isLoading: boolean = false;
  rsp_apps: any;
  tenantNames: { app_id: number; app_name: string; is_active: boolean }[] = [];
  // Files selected for CNIC and Picture
  cnicImageFile: File | null = null;
  employeePictureFile: File | null = null;
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
    this.isLoading = true;
    this.GetTenantNames();
  }
  GetTenantNames() {
    this.employeeService.getTenantDetails().subscribe(
      (response) => {
        if (response != null || response != undefined) {
          this.tenantNames = response.filter((tenant: { is_active: boolean; }) => tenant.is_active === true);;
        }
        this.rsp_apps = response;
      },
      (error) => {
        this.toastService.showError('Error retrieving app details: ' + error.error.toString());
      }
    );
  }
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (input.name === 'cnicImage') {
        this.cnicImageFile = input.files[0];
      } else if (input.name === 'employeePicture') {
        this.employeePictureFile = input.files[0];
      }
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

      // Simulate a form submission
      const formData = {
        employeeName: form.value.employeeName,
        contactNumber: form.value.contactNumber,
        email: form.value.email,
        cnic: form.value.cnic,
        permanentAddress: form.value.permanentAddress,
        dateRange: this.customerFormState.dateRange,
        startDate: form.value.startDate,
        endDate: form.value.endDate,
        cnicImage: this.cnicImageFile?.name,
        cnicPath: form.value.cnicImage,
        employeePicture: this.employeePictureFile?.name,
        employeePath: form.value.employeePicture
      };
      this.employeeService.postEmployeeRegistration(formData).subscribe(
        (response) => {
          if (response) {
            setTimeout(() => {
              this.isLoading = false;
            }, 2000);
            this.toastService.showSuccess('Employee registered successfully!');
            form.resetForm(); // Reset the form after success
            this.isLoading = false;
            this.cnicImageFile = null;
            this.employeePictureFile = null;
          }
        },
        (error) => {
          this.toastService.showError('Error while creating employee: ' + error.message.toString());
        }
      );
    }
  }
}