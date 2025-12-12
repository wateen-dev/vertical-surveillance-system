import { Component } from '@angular/core';
import { VisitorRegistrationService } from './service/visitorregistrationservice'
import { ToastService } from '../service/toast.service';
import { Router } from '@angular/router';
import { DataService } from '../service/DataService';
import { CreateVisitorRegistrationModel } from '../models/CreateVisitorRegistrationModel';

@Component({
  selector: 'app-visitorregistration',
  templateUrl: './visitorregistration.component.html',
  styleUrl: './visitorregistration.component.css'
})
export class VisitorregistrationComponent {
  // Date range property
  isLoading: boolean = false;
  rsp_apps: any;
  tenantNames: { id: number; name: string; is_active: boolean }[] = [];
  // Files selected for CNIC and Picture
  cnicImageFile: File | null = null;
  employeePictureFile: File | null = null;
  constructor(private toastService: ToastService, private visitorService: VisitorRegistrationService, private router: Router, private dataService: DataService) { }

  customerFormState: CreateVisitorRegistrationModel = {
    visitorName: '',
    companyName: '',
    tenant_id: 0,
    tenant_name: '',
    ContactNumber: '',
    Email: '',
    CNIC: '',
  };

  ngOnInit(): void {

    // this.fetchTenantNames();
  }
  fetchTenantNames() {
    this.visitorService.getTenantDetails().subscribe(
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

    const payload = {
      VisitorId: 0, // new visitor
      VisitorName: form.value.visitorName,
      CompanyName: form.value.companyName,
      ContactNumber: form.value.contactNumber,
      EmailAddress: form.value.email,
      CNIC: form.value.cnic,
      TenantId: form.value.app.tenant_id
    };

    this.visitorService.postVisitorRegistration(payload).subscribe(
      (response) => {
        this.isLoading = false;
        this.toastService.showSuccess('Visitor registered successfully!');
        form.resetForm();
        this.cnicImageFile = null;
        this.employeePictureFile = null;
      },
      (error) => {
        this.isLoading = false;
        this.toastService.showError(error?.error?.message || 'Something went wrong!');
      }
    );
  } else {
    this.toastService.showError('Please fill all required fields.');
  }
}


}
