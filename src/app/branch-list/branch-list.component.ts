import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BranchService } from '../add-branch/service/branch-service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastService } from '../service/toast.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

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
    debugger
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
}
