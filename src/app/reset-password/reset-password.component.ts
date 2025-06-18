import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { ToastService } from '../service/toast.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent  {
  resetPasswordForm: FormGroup;
  userId: string | null = null;


  constructor(
    private route: ActivatedRoute,private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,private toastService: ToastService
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
    this.userId = '';
  }

  ngOnInit(): void {
   
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id'); // Access the 'id' parameter
      console.log(this.userId);
    });
  }
  

  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      const { newPassword, confirmPassword } = this.resetPasswordForm.value;
      if (newPassword !== confirmPassword) {
        this.toastService.showWarning('Password doesnot match!')
        return;
      }

      this.http.post(`${environment.localApiUrl}User/reset-password`, { userId: this.userId, newPassword })
        .subscribe({
          next: () => this.toastService.showSuccess('Password Reset successfully!'),
          error: () => {this.toastService.showSuccess('Password Reset successfully!')
            this.resetPasswordForm.reset();
            this.router.navigate(['/login']);
          }
        });
    }
  }
}
