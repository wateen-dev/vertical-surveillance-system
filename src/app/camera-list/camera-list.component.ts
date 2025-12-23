import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../service/toast.service';
import { CameraService } from '../add-camera/service/camera-service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

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
export class CameraListComponent implements OnInit {
  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  selectedCameraId!: number;
  selectedCameraName!: string;
  cameras: Camera[] = [];
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
  ) { }

  ngOnInit() {
    this.loadCameras();
  }

  loadCameras() {
    this.isLoading = true;
    this.cameraService.getAllCameras().subscribe({
      next: (res) => {

        this.dataSource.data = res.data;
        this.cameras = res.data;
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
  AddCamera() {
    this.router.navigate(['/add-camera']);
  }
  exportAsExcel() {

  if (!this.cameras || this.cameras.length === 0) {
    this.toast.showError("No data available to export!");
    return;
  }

  type ExportRow = Record<string, any>;

  const exportData: ExportRow[] = this.cameras.map((cam: Camera) => ({
    CameraID: cam.cameraId,
    BranchID: cam.branchId,
    BranchName: cam.branchName,
    CameraName: cam.cameraName,
    StreamURL: cam.rtspStreamUrl || "N/A",
    Status: cam.isDeleted ? "Inactive" : "Active",
    CreatedOn: cam.createdOn,
    CreatedBy: cam.createdBy
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
  XLSX.utils.book_append_sheet(workbook, worksheet, "Camera List");

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
  link.download = "CameraList.xlsx";
  link.click();
  window.URL.revokeObjectURL(url);
}

}

