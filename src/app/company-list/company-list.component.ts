import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CompanyService } from '../add-company/service/company-service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastService } from '../service/toast.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css'
})

export class CompanyListComponent implements OnInit {
  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  selectedCompanyId!: number;
  selectedCompanyName!: string;
  isLoading = false;
  displayedColumns: string[] = [
    'companyId',
    'companyName',
    'industryType',
    'status',
    'createdOn',
    'createdBy',
    'actions'
  ];

  dataSource = new MatTableDataSource<Company>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private companyService: CompanyService,
    private toast: ToastService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadCompanies();
  }

  loadCompanies() {
    this.isLoading = true;
    this.companyService.getAllCompanies().subscribe({
      next: (res) => {
        this.dataSource.data = res.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: () => {
        this.toast.showError("Failed to load companies");
      }
    });
  }

  applySearch(event: any) {
    const value = event.target.value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  editCompany(company: Company) {
    this.router.navigate(['/add-company'], { state: { company } });
  }

  openDeleteDialog(company: Company) {
    this.selectedCompanyId = company.companyId;
    this.selectedCompanyName = company.companyName;

    this.dialogRef = this.dialog.open(this.deleteDialog, {
      width: '1000px',
      panelClass: 'rounded-dialog'
    });
  }

  confirmDelete() {
    this.companyService.deleteCompanyStatus(this.selectedCompanyId)
      .subscribe({
        next: () => {
          this.toast.showSuccess("Company deleted successfully!");
          this.dialogRef.close();
          this.loadCompanies();
        },
        error: () => {
          this.toast.showError("Failed to delete company!");
          this.dialogRef.close();
        }
      });
  }
}
