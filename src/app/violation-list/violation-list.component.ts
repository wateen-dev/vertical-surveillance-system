import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastService } from '../service/toast.service';
import { ViolationService } from '../add-violation/service/violation-service';
import * as XLSX from 'xlsx';

interface ViolationCategory {
  categoryId: number;
  categoryName: string;
  createdOn: string;
  createdBy: string;
  modifiedOn: string | null;
  modifiedBy: string | null;
  isDeleted: boolean;
}

@Component({
  selector: 'app-violation-list',
  templateUrl: './violation-list.component.html',
  styleUrl: './violation-list.component.css'
})
export class ViolationListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;
  categories: ViolationCategory[] = [];
  dataSource = new MatTableDataSource<ViolationCategory>([]);
  isLoading = false;

  dialogRef!: MatDialogRef<any>;
  selectedCategoryId!: number;
  selectedCategoryName!: string;

  displayedColumns = [
    'categoryId',
    'categoryName',
    'createdOn',
    'createdBy',
    'isDeleted',
    'actions'
  ];

  constructor(
    private categoryService: ViolationService,
    private toast: ToastService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading = true;

    this.categoryService.getAllCategories().subscribe({
      next: (res: any) => {
        this.dataSource.data = res.data;
        this.categories = res.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: () => {
        this.toast.showError("Failed to load categories");
      }
    });
  }

  applySearch(event: any) {
    const value = event.target.value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  editCategory(category: ViolationCategory) {
    this.router.navigate(['/add-violation'], { state: { category } });
  }

  openDeleteDialog(category: ViolationCategory) {
    this.selectedCategoryId = category.categoryId;
    this.selectedCategoryName = category.categoryName;
    this.dialogRef = this.dialog.open(this.deleteDialog, {
      width: '1000px',
      panelClass: 'rounded-dialog'
    });
  }

  confirmDelete() {
    this.categoryService.deleteCategoryStatus(this.selectedCategoryId).subscribe({
      next: () => {
        this.toast.showSuccess("Category deleted successfully!");
        this.dialogRef.close();
        this.loadCategories();
      },
      error: () => {
        this.toast.showError("Failed to delete category");
        this.dialogRef.close();
      }
    });
  }
  AddViolations() {
    this.router.navigate(['/add-violation']);
  }
  exportAsExcel() {

  if (!this.categories || this.categories.length === 0) {
    this.toast.showError("No data available to export!");
    return;
  }

  type ExportRow = Record<string, any>;

  const exportData: ExportRow[] = this.categories.map((cat: any) => ({
    CategoryID: cat.categoryId,
    CategoryName: cat.categoryName,
    CreatedOn: cat.createdOn,
    CreatedBy: cat.createdBy,
    ModifiedOn: cat.modifiedOn,
    ModifiedBy: cat.modifiedBy,
    Status: cat.isDeleted ? "Inactive" : "Active"
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

  // Auto adjust column width
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
  XLSX.utils.book_append_sheet(workbook, worksheet, "Violation Categories");

  // Export file
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
  link.download = "ViolationCategories.xlsx";
  link.click();
  window.URL.revokeObjectURL(url);
}

}
