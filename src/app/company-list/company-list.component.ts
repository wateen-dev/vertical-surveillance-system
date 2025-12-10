import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CompanyService } from '../add-company/service/company-service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastService } from '../service/toast.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
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
  companies: Company[] = [];
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
        this.companies = res.data;
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
   AddCompany() {
      this.router.navigate(['/add-company']);
    }
   exportAsExcel() {

  if (!this.companies || this.companies.length === 0) {
    this.toast.showError("No data available to export!");
    return;
  }

  type ExportRow = Record<string, any>;

  const exportData: ExportRow[] = this.companies.map((company: Company) => ({
    CompanyID: company.companyId,
    CompanyName: company.companyName,
    IndustryType: company.industryType,
    CreatedOn: company.createdOn,
    CreatedBy: company.createdBy,
    Status: company.isDeleted ? "Inactive" : "Active"
  }));

  // Create worksheet
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);

  // Apply styling to header row
  const headerKeys = Object.keys(exportData[0]);
  headerKeys.forEach((key, columnIndex) => {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: columnIndex });
    if (!worksheet[cellAddress]) return;

    worksheet[cellAddress].s = {
      font: { bold: true },
      fill: { fgColor: { rgb: "D9D9D9" } },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } }
      }
    };
  });

  // Auto column width
  worksheet["!cols"] = headerKeys.map(key => ({
    wch: Math.max(
      key.length,
      ...exportData.map(row =>
        row[key] ? row[key].toString().length : 10
      )
    )
  }));

  // Create workbook
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Company List");

  // Export
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
    cellStyles: true
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "CompanyList.xlsx";
  link.click();
  window.URL.revokeObjectURL(url);
}

}
