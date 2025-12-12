import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './service/user-service';
import { ToastService } from '../service/toast.service';
import { CompanyService } from '../add-company/service/company-service'
import { RoleService } from '../add-roles/service/role-service';

interface Role {
  roleId: number;
  roleName: string;
  isDeleted: boolean;
}

@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.css']
})
export class UserRegistrationComponent {
  registrationForm: FormGroup;
  companies: any[] = [];
  roles: Role[] = [];
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private companyService: CompanyService,
    private roleService: RoleService,
    private snackBar: MatSnackBar, private toastService: ToastService
  ) {
    this.registrationForm = this.fb.group({
      UserName: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Phone: ['', Validators.pattern(/^\d{11}$/)],
      RoleID: [null, Validators.required],       // store roleId
      RoleRights: [''],                           // store roleName
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

    this.roleService.getAllRoles().subscribe((res: any) => {
      if (res.success) {
        this.roles = res.data.filter((r: Role) => !r.isDeleted); // Optional: only active roles
      }
    });
  }

  registerUser() {
    debugger
    if (this.registrationForm.valid) {
      this.isLoading = true;

      const payload = {
        userId: 0,  // new user
        userName: this.registrationForm.value.UserName,
        firstName: this.registrationForm.value.FirstName,
        lastName: this.registrationForm.value.LastName,
        email: this.registrationForm.value.Email,
        phone: this.registrationForm.value.Phone,
        roleRights: this.registrationForm.value.RoleRights, // role name
        roleID: this.registrationForm.value.RoleID,         // role id
        passwordHash: this.registrationForm.value.Password,
        createdAt: new Date().toISOString(),
        companyID: this.registrationForm.value.companyId
      };

      this.userService.registerUser(payload).subscribe(
        (response: any) => {
          this.isLoading = false;
          if (response.success) {
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
  onRoleChange(selectedRoleId: number) {
    const selectedRole = this.roles.find(r => r.roleId === selectedRoleId);
    if (selectedRole) {
      this.registrationForm.patchValue({
        RoleRights: selectedRole.roleName   // set the role name automatically
      });
    }
  }
}
