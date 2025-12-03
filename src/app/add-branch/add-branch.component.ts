import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchService } from './service/branch-service';
import { ToastService } from '../service/toast.service';
import { Router } from '@angular/router';

interface Branch {
  branchId: number;
  branchName: string;
  address: string;
  city: string;
  isDeleted: boolean;
  createdOn: string;
  createdBy: string;
}
@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrl: './add-branch.component.css'
})
export class AddBranchComponent implements OnInit {
  isEditMode = false;
  branchIdToEdit: number | null = null;
  branchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private branchService: BranchService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.branchForm = this.fb.group({
      branchName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      isDeleted: [false]
    });
  }

  ngOnInit() {
    const branch = history.state.branch as Branch;
    if (branch) {
      this.loadBranchForEdit(branch);
    }
  }
  addBranch() {
    if (this.branchForm.valid) {
      const request = {
        ...this.branchForm.value,
        branchId: this.isEditMode ? this.branchIdToEdit : 0,
        createdBy: "system",
        modifiedBy: null,
        createdOn: new Date(),
        modifiedOn: null
      };

      // If edit mode, call update API
      const apiCall = this.isEditMode
        ? this.branchService.updateBranch(request)
        : this.branchService.addBranch(request);

      apiCall.subscribe(
        (res: any) => {
          this.toastService.showSuccess(
            this.isEditMode ? "Branch updated successfully!" : "Branch added successfully!"
          );

          this.branchForm.reset({ isDeleted: false });
          this.isEditMode = false;
          this.branchIdToEdit = null;

          // Reset validation state
          this.branchForm.markAsPristine();
          this.branchForm.markAsUntouched();
          this.branchForm.updateValueAndValidity();
          this.router.navigate(['/branch-list']);
        },
        (err) => {
          this.toastService.showError(
            this.isEditMode ? "Failed to update branch!" : "Failed to add branch!"
          );
        }
      );
    }
  }

  loadBranchForEdit(branch: Branch) {
    this.isEditMode = true;
    this.branchIdToEdit = branch.branchId;

    this.branchForm.patchValue({
      branchName: branch.branchName,
      address: branch.address,
      city: branch.city,
      isDeleted: branch.isDeleted
    });
  }
}
