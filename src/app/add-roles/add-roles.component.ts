import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from './service/role-service';
import { CompanyService } from '../add-company/service/company-service';
import { ToastService } from '../service/toast.service';
import { Router } from '@angular/router';

interface Role {
  roleId: number;
  roleName: string;
  companyId: number;
  isDeleted: boolean;
  createdOn: string;
  createdBy: string;
}

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrl: './add-roles.component.css'
})
export class AddRolesComponent implements OnInit {

  roleForm: FormGroup;
  isEditMode = false;
  roleIdToEdit: number | null = null;
  companies: any[] = [];
  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private companyService: CompanyService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.roleForm = this.fb.group({
      roleName: ['', Validators.required],
      companyId: [null, Validators.required],
      isDeleted: [false]
    });
  }

  ngOnInit(): void {
    const editRole = history.state.role as Role;
    if (editRole) this.loadRoleForEdit(editRole);
    this.loadCompanies();
  }

  saveRole() {
    if (this.roleForm.invalid) return;

    const payload = {
      ...this.roleForm.value,
      roleId: this.isEditMode ? this.roleIdToEdit : 0,
      createdBy: "system",
      modifiedBy: "system",
      createdOn: new Date(),
      modifiedOn: null
    };

    const apiCall = this.isEditMode
      ? this.roleService.updateRole(payload)
      : this.roleService.addRole(payload);

    apiCall.subscribe(
      (res: any) => {
        this.toastService.showSuccess(
          this.isEditMode ? "Role updated successfully!" : "Role added successfully!"
        );

        this.roleForm.reset({ isDeleted: false });
        this.router.navigate(['/roles-list']);
      },
      () => {
        this.toastService.showError(
          this.isEditMode ? "Failed to update role!" : "Failed to add role!"
        );
      }
    );
  }

  loadRoleForEdit(role: Role) {
    this.isEditMode = true;
    this.roleIdToEdit = role.roleId;

    this.roleForm.patchValue({
      roleName: role.roleName,
      companyId: role.companyId,
      isDeleted: role.isDeleted
    });
  }
  loadCompanies() {
    this.companyService.getAllCompanies().subscribe((res: any) => {
    if (res.success) {
      this.companies = res.data;
    }
  });
  }
}
