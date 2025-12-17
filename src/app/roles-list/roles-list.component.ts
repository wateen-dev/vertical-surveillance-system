import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastService } from '../service/toast.service';
import { RoleService } from '../add-roles/service/role-service';
import * as XLSX from 'xlsx';

interface Role {
  roleId: number;
  roleName: string;
  companyId: number;
  companyName: string;
  isDeleted: boolean;
  createdOn: string;
  createdBy: string;
}

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.css'
})
export class RolesListComponent implements OnInit {

  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  selectedRoleId!: number;
  selectedRoleName!: string;

  isLoading = false;
  roles: Role[] = [];

  displayedColumns: string[] = [
    'roleId',
    'roleName',
    'companyName',
    'status',
    'createdOn',
    'createdBy',
    'actions'
  ];

  dataSource = new MatTableDataSource<Role>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private roleService: RoleService,
    private toast: ToastService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.isLoading = true;

    this.roleService.getAllRoles().subscribe({
      next: (res) => {
        this.roles = res.data;
        this.dataSource.data = res.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: () => {
        this.toast.showError("Failed to load roles");
      }
    });
  }

  applySearch(event: any) {
    const value = event.target.value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  AddRole() {
    this.router.navigate(['/add-roles']);
  }

  editRole(role: Role) {
    this.router.navigate(['/add-roles'], { state: { role } });
  }

  openDeleteDialog(role: Role) {
    this.selectedRoleId = role.roleId;
    this.selectedRoleName = role.roleName;

    this.dialogRef = this.dialog.open(this.deleteDialog, {
      width: '900px',
      panelClass: 'rounded-dialog'
    });
  }

  confirmDelete() {
    this.roleService.deleteRole(this.selectedRoleId).subscribe({
      next: () => {
        this.toast.showSuccess("Role deleted successfully!");
        this.dialogRef.close();
        this.loadRoles();
      },
      error: () => {
        this.toast.showError("Failed to delete role!");
        this.dialogRef.close();
      }
    });
  }

  exportAsExcel() {
    if (!this.roles || this.roles.length === 0) {
      this.toast.showError("No data available to export!");
      return;
    }

    type ExportRow = Record<string, any>;

    const exportData: ExportRow[] = this.roles.map(r => ({
      RoleID: r.roleId,
      RoleName: r.roleName,
      CreatedOn: r.createdOn,
      CreatedBy: r.createdBy,
      Status: r.isDeleted ? "Inactive" : "Active"
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
    XLSX.utils.book_append_sheet(workbook, worksheet, "Roles List");

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
    link.download = "RolesList.xlsx";
    link.click();
    window.URL.revokeObjectURL(url);
  }

}
