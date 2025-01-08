import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './service/user-service';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.css']
})
export class UserRegistrationComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,private toastService: ToastService
  ) {
    this.registrationForm = this.fb.group({
      UserName: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Phone: ['', Validators.pattern(/^\d{11}$/)],
      RoleRights: ['', Validators.required]
    });
  }

  registerUser() {
    if (this.registrationForm.valid) {
      this.userService.registerUser(this.registrationForm.value).subscribe(
        (response:any) => {
          this.toastService.showSuccess('User registered successfully!');
          this.registrationForm.reset();
        },
        (error) => {
          this.toastService.showSuccess('User registered successfully!');
          this.registrationForm.reset();
        }
      );
    }
  }
}
