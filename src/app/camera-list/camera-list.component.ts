import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../service/toast.service';
import { CameraService } from '../add-camera/service/camera-service';
import { Router } from '@angular/router';
interface Camera {
  cameraId: number;
  branchId: number;
  branchName: string;
  cameraName: string;
  rtspStreamUrl: string | null;
  status: string;
  createdOn: string;
  createdBy: string;
  isDeleted: boolean;
}
@Component({
  selector: 'app-camera-list',
  templateUrl: './camera-list.component.html',
  styleUrl: './camera-list.component.css'
})
export class CameraListComponent  implements OnInit {
  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  selectedCameraId!: number;
  selectedCameraName!: string;

  isLoading = false;

  displayedColumns: string[] = [
    'cameraId',
    'cameraName',
    'branchId',
    'branchName',
    'rtspStreamUrl',
    'status',
    'createdOn',
    'createdBy',
    'actions'
  ];

  dataSource = new MatTableDataSource<Camera>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private cameraService: CameraService,
    private toast: ToastService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCameras();
  }

  loadCameras() {
    this.isLoading = true;
    this.cameraService.getAllCameras().subscribe({
      next: (res) => {
        debugger
        this.dataSource.data = res.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: () => {
        this.toast.showError("Failed to load cameras");
        this.isLoading = false;
      }
    });
  }

  applySearch(event: any) {
    const value = event.target.value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  openDeleteDialog(camera: Camera) {
    this.selectedCameraId = camera.cameraId;
    this.selectedCameraName = camera.cameraName;

    this.dialogRef = this.dialog.open(this.deleteDialog, {
      width: '900px',
      panelClass: 'rounded-dialog'
    });
  }

  confirmDelete() {
    this.cameraService.deleteCamera(this.selectedCameraId).subscribe({
      next: () => {
        this.toast.showSuccess("Camera deleted successfully!");
        this.dialogRef.close();
        this.loadCameras();
      },
      error: () => {
        this.toast.showError("Failed to delete camera!");
        this.dialogRef.close();
      }
    });
  }
   editCamera(camera: Camera) {
     this.router.navigate(['/add-camera'], { state: { camera } });
  }
}

