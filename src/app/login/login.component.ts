import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserLoginModel } from '../models/UserLoginModel';
import { ToastService } from '../service/toast.service'; // Adjust the path as necessary
import { AuthService } from '../service/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/DataService'; // Adjust path as necessary
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private secretKey: string = 'Rd^y#0$59v37m$t*6*15j3Z^$X$t#792'; // Replace this with a secure key
  @Input() isLoading: boolean = false;
  constructor(private toastService: ToastService,private authService: AuthService,private cdr: ChangeDetectorRef, private router: Router,private dataService: DataService){}
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      // Encrypt the password
      const encryptedPassword = encryptPassword(form.value.password, this.secretKey);
    //  const loginData = new UserLoginModel(form.value.username, form.value.password);
      this.authService.login(form.value.username, form.value.password).subscribe(
        (response: any) => {
          if (response) {
            setTimeout(() => {
              this.isLoading = false;
            }, 2000);
            if (!response.error) {
              this.toastService.showSuccess('Login Successful');
               // Include the encrypted password in the response object
              response.content.encryptedPassword = encryptedPassword;
              this.dataService.setContent(response);
              this.router.navigate(['/dashboard']);
            } else if (response.error) {
              // Check if response has an error property
              this.toastService.showError(response.message || 'Login Failed');
            }
          }
        },
        (error: any) => {
          // Handle HTTP error response
          const errorMessage = error.error?.message || 'An unexpected error occurred.';
          this.toastService.showError(errorMessage);
        }
      );
    }
  }
}
// // Encryption function
// function encryptPassword(password: string, secretKey: string): string {
//   const encrypted = CryptoJS.AES.encrypt(password, secretKey).toString();
//   return encrypted;
// }
function encryptPassword(password: string, secretKey: string): string {
  const iv = CryptoJS.lib.WordArray.random(16); // Generate a random IV
  const encrypted = CryptoJS.AES.encrypt(password, CryptoJS.enc.Utf8.parse(secretKey), {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
   // Concatenate IV and encrypted data, then encode in Base64
   const encryptedWithIv = iv.concat(encrypted.ciphertext);
   return CryptoJS.enc.Base64.stringify(encryptedWithIv);
}
