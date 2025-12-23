import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateTenantModel } from '../models/CreateTenantModel';
import { DataService } from '../service/DataService';
import { ToastService } from '../service/toast.service';
import {TenantRegistrationService} from './service/tenantregistrationservice'
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenantregistration',
  templateUrl: './tenantregistration.component.html',
  styleUrl: './tenantregistration.component.css'
})
export class TenantregistrationComponent {
  appForm: FormGroup | undefined;
  isLoading: boolean = false;
    // Files selected for CNIC and Picture
  attachmentFile: File | null = null;
  customerFormState: CreateTenantModel = {
    CompanyName: '',
    Floor: '',
    StaffCount: 0,
    Attachment: '',
    OwnerName: '',
    Contact_Number: '',
    Email: '',
    CNIC: '',
    Address: '',
  };

  constructor(private fb: FormBuilder,private toastService: ToastService, private tenantService: TenantRegistrationService, private router: Router, private dataService: DataService) {
    this.createForm();
  }

  createForm() {
    this.appForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      floor: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      staffCount: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
      // attachments: [null, Validators.required],
      ownerName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      contactNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      cnic: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{7}-\d{1}$/)]],
      permanentAddress: ['', [Validators.required, Validators.minLength(5)]]
    });
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
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.attachmentFile = input.files[0];
    }
  }
  onSubmit(form: any): void {
    if (form.valid) {
      this.isLoading = true;

      // Simulate a form submission
      const formData = {
        CompanyName: form.value.companyName,
        Floor: form.value.floor,
        StaffCount: form.value.staffCount,
        // AttachmentFile: this.attachmentFile,  // Assuming 'attachmentFile' holds the selected file name
        // AttachmentFilePath: form.value.attachments, // Assuming 'attachment' is the input field for the file path
        OwnerName: form.value.ownerName,
        ContactNumber: form.value.contactNumber.toString(),
        EmailAddress: form.value.email,
        CNIC: form.value.cnic,
        PermanentAddress: form.value.permanentAddress
      };
   

      this.tenantService.postTenantRegistration(formData).subscribe(
        (response) => {
          if (response) {
            setTimeout(() => {
              this.isLoading = false;
            }, 2000);
            this.toastService.showSuccess('Employee registered successfully!');
            form.resetForm(); // Reset the form after success
            this.isLoading = false;
            this.attachmentFile = null;
          }
        },
        (error) => {
          this.isLoading = false;
          this.toastService.showSuccess('Tenant registered successfully!');
          form.resetForm();
        }
      );
    }
  }
}