import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from './service/company-service';
import { ToastService } from '../service/toast.service';
import { Router } from '@angular/router';

interface Company {
  companyId: number;
  companyName: string;
  industryType: string;
  isDeleted: boolean;
  createdOn: string;
  createdBy: string;
}

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrl: './add-company.component.css'
})

export class AddCompanyComponent implements OnInit {
  companyForm: FormGroup;
  isEditMode = false;
  companyIdToEdit: number | null = null;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.companyForm = this.fb.group({
      companyName: ['', Validators.required],
      industryType: ['', Validators.required],
      isDeleted: [false]
    });
  }

  ngOnInit(): void {
    const company = history.state.company as Company;
    if (company) this.loadCompanyForEdit(company);
  }

  saveCompany() {
    if (this.companyForm.invalid) return;

    const request = {
      ...this.companyForm.value,
      companyId: this.isEditMode ? this.companyIdToEdit : 0,
      createdBy: "system",
      modifiedBy: null,
      createdOn: new Date(),
      modifiedOn: null
    };

    const apiCall = this.isEditMode
      ? this.companyService.updateCompany(request)
      : this.companyService.addCompany(request);

    apiCall.subscribe(
      (res: any) => {
        this.toastService.showSuccess(
          this.isEditMode ? "Company updated successfully!" : "Company added successfully!"
        );

        this.companyForm.reset({ isDeleted: false });
        this.companyForm.markAsPristine();
        this.companyForm.markAsUntouched();

        this.router.navigate(['/company-list']);
      },
      () => {
        this.toastService.showError(
          this.isEditMode ? "Failed to update company!" : "Failed to add company!"
        );
      }
    );
  }

  loadCompanyForEdit(company: Company) {
    this.isEditMode = true;
    this.companyIdToEdit = company.companyId;

    this.companyForm.patchValue({
      companyName: company.companyName,
      industryType: company.industryType,
      isDeleted: company.isDeleted
    });
  }
}
