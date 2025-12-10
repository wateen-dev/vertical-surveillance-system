import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViolationService } from './service/violation-service';
import { ToastService } from '../service/toast.service';
import { Router } from '@angular/router';

interface ViolationCategory {
  categoryId: number;
  categoryName: string;
  isDeleted: boolean;
  createdOn: string;
  createdBy: string;
}

@Component({
  selector: 'app-add-violation',
  templateUrl: './add-violation.component.html',
  styleUrl: './add-violation.component.css'
})
export class AddViolationComponent  implements OnInit {

  isEditMode = false;
  categoryIdToEdit: number | null = null;
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private vcService: ViolationService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      isDeleted: [false]
    });
  }

  ngOnInit() {
    const category = history.state.category as ViolationCategory;

    if (category) {
      this.loadCategoryForEdit(category);
    }
  }

  saveCategory() {
    if (this.categoryForm.valid) {
      const request = {
        ...this.categoryForm.value,
        categoryId: this.isEditMode ? this.categoryIdToEdit : 0,
        createdBy: "system",
        modifiedBy: null,
        createdOn: new Date(),
        modifiedOn: null
      };

      const apiCall = this.isEditMode
        ? this.vcService.updateCategory(request)
        : this.vcService.addCategory(request);

      apiCall.subscribe(
        (res: any) => {
          this.toastService.showSuccess(
            this.isEditMode ? "Category updated successfully!" : "Category added successfully!"
          );

          this.categoryForm.reset({ isDeleted: false });
          this.isEditMode = false;
          this.categoryIdToEdit = null;

          this.categoryForm.markAsPristine();
          this.categoryForm.markAsUntouched();
          this.categoryForm.updateValueAndValidity();

          this.router.navigate(['/violation-list']);
        },
        (err) => {
          this.toastService.showError(
            this.isEditMode ? "Failed to update category!" : "Failed to add category!"
          );
        }
      );
    }
  }

  loadCategoryForEdit(category: ViolationCategory) {
    this.isEditMode = true;
    this.categoryIdToEdit = category.categoryId;

    this.categoryForm.patchValue({
      categoryName: category.categoryName,
      isDeleted: category.isDeleted
    });
  }
}
