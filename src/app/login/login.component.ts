import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserLoginModel } from '../models/UserLoginModel';
import { ToastService } from '../service/toast.service'; // Adjust the path as necessary
import { AuthService } from '../service/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/DataService'; // Adjust path as necessary

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() isLoading: boolean = false;

  constructor(
    private toastService: ToastService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private dataService: DataService
  ) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      const loginData = new UserLoginModel(form.value.username, form.value.password);

      this.authService.login(loginData).subscribe(
        (response: any) => {
          setTimeout(() => {
            this.isLoading = false;
          }, 2000);

          if (response && response.message === 'Login successful.') {
            this.toastService.showSuccess('Login Successful');

            // Save user data and token in DataService
            const userContent = {
              ...response.user,
              token: response.token // Save JWT token here
            };
            this.dataService.setContent(userContent);

            // Navigate to dashboard
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.toastService.showError(response.message || 'Login Failed');
          }
        },
        (error) => {
          this.isLoading = false;
          this.toastService.showError(error?.error?.message || 'Login Failed');
        }
      );
    }
  }
}
