import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './service/user-service';
import { ToastService } from '../service/toast.service';
import { CompanyService } from '../add-company/service/company-service'

@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.css']
})
export class UserRegistrationComponent {
  registrationForm: FormGroup;
  companies: any[] = [];
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private companyService: CompanyService,
    private snackBar: MatSnackBar, private toastService: ToastService
  ) {
    this.registrationForm = this.fb.group({
      UserName: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Phone: ['', Validators.pattern(/^\d{11}$/)],
      RoleRights: ['', Validators.required],
      companyId: [null, Validators.required],   // <── ADD THIS
      Password: ['', [Validators.required, Validators.minLength(6)]] // <-- Add this
    });
  }

  ngOnInit() {
    this.companyService.getAllCompanies().subscribe((res: any) => {
      if (res.success) {
        this.companies = res.data;
      }
    });
  }

 registerUser() {
  if (this.registrationForm.valid) {
    this.isLoading = true;

    // Map Password to PasswordHash
    const payload = { ...this.registrationForm.value, PasswordHash: this.registrationForm.value.Password };

    this.userService.registerUser(payload).subscribe(
      (response: any) => {
        this.isLoading = false;
        if (response && response.success) {
          this.toastService.showSuccess(response.message);
          this.registrationForm.reset();
        } else {
          this.toastService.showError(response?.message || 'Registration failed.');
        }
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
