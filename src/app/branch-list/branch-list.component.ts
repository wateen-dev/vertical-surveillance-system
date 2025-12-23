import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BranchService } from '../add-branch/service/branch-service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastService } from '../service/toast.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

interface Branch {
  branchId: number;
  branchName: string;
  companyId: number;
  companyName: string;
  address: string;
  city: string;
  isDeleted: boolean;
  createdOn: string;
  createdBy: string;
}

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrl: './branch-list.component.css'
})
export class BranchListComponent implements OnInit {
  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  selectedBranchId!: number;
  selectedBranchName!: string;
  branches: Branch[] = [];
  isLoading = false;
  displayedColumns: string[] = [
    'branchId',
    'branchName',
    'address',
    'city',
    'companyId',
    'companyName',
    'status',
    'createdOn',
    'createdBy',
    'actions'
  ];

  dataSource = new MatTableDataSource<Branch>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private branchService: BranchService,
    private toast: ToastService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadBranches();
  }

  loadBranches() {
    this.isLoading = true; // Show spinner
    this.branchService.getAllBranches().subscribe({
      next: (res) => {
        this.dataSource.data = res.data;
        this.branches = res.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false; // Hide spinner
      },
      error: () => {
        this.toast.showError("Failed to load branches");
      }
    });
  }


  applySearch(event: any) {
    const value = event.target.value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  editBranch(branch: Branch) {

    this.router.navigate(['/add-branch'], { state: { branch } });
  }
  openDeleteDialog(branch: Branch) {
    this.selectedBranchId = branch.branchId;
    this.selectedBranchName = branch.branchName;  // <-- add this

    this.dialogRef = this.dialog.open(this.deleteDialog, {
      width: '1000px',
      panelClass: 'rounded-dialog'
    });
  }
  confirmDelete() {
    this.branchService.deleteBranchStatus(this.selectedBranchId)
      .subscribe(
        (res: any) => {
          this.toast.showSuccess("Branch deleted successfully!");
          this.dialogRef.close();
          this.loadBranches(); // Refresh list
        },
        (err) => {
          this.toast.showError("Failed to delete branch!");
          this.dialogRef.close();
        }
      );
  }
  AddBranch() {
    this.router.navigate(['/add-branch']);
  }
  exportAsExcel() {

    if (!this.branches || this.branches.length === 0) {
      this.toast.showError("No data available to export!");
      return;
    }

    type ExportRow = Record<string, any>;

    const exportData: ExportRow[] = this.branches.map((branch: Branch) => ({
      BranchID: branch.branchId,
      BranchName: branch.branchName,
      CompanyID: branch.companyId,
      CompanyName: branch.companyName,
      Address: branch.address,
      City: branch.city,
      Status: branch.isDeleted ? "Inactive" : "Active",
      CreatedOn: branch.createdOn,
      CreatedBy: branch.createdBy
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
    XLSX.utils.book_append_sheet(workbook, worksheet, "Branch List");

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
    link.download = "BranchList.xlsx";
    link.click();
    window.URL.revokeObjectURL(url);
  }

}
