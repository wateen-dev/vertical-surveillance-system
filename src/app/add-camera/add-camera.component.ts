import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CameraService } from './service/camera-service';
import { ToastService } from '../service/toast.service';
import { Router } from '@angular/router';
interface Camera {
  cameraId: number;
  branchId: number;
  cameraName: string;
  rtspStreamUrl: string;
  status: string;
  isDeleted: boolean;
  createdOn: string;
  createdBy: string;
}
@Component({
  selector: 'app-add-camera',
  templateUrl: './add-camera.component.html',
  styleUrl: './add-camera.component.css'
})
export class AddCameraComponent implements OnInit {
  isEditMode = false;
  cameraIdToEdit: number | null = null;
  cameraForm!: FormGroup;
  branches: any[] = []; // dropdown data

  constructor(
    private fb: FormBuilder,
    private cameraService: CameraService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cameraForm = this.fb.group({
      branchId: ['', Validators.required],
      cameraName: ['', Validators.required],
      rtspStreamUrl: [''],
      status: ['Active', Validators.required],
      isDeleted: [false]
    });

    this.loadBranches();

    const camera = history.state.camera as Camera;
    if (camera) {
      this.loadCameraForEdit(camera);
    }
  }

  loadBranches() {
    this.cameraService.getAllBranches().subscribe(
      (res: any) => {
        this.branches = res.data || res;
      },
      () => this.toastService.showError("Failed to load branches")
    );
  }
  addCamera() {

    if (this.cameraForm.valid) {

      const request = {
        ...this.cameraForm.value,
        cameraId: this.isEditMode ? this.cameraIdToEdit : 0,
        createdBy: "system",
        createdOn: new Date(),
        modifiedBy: null,
        modifiedOn: null
      };

      // Switch API based on mode
      const apiCall = this.isEditMode
        ? this.cameraService.updateCamera(request)
        : this.cameraService.addCamera(request);

      apiCall.subscribe(
        (res: any) => {
          this.toastService.showSuccess(
            this.isEditMode ? "Camera updated successfully!" : "Camera added successfully!"
          );

          // Reset form
          this.cameraForm.reset({
            branchId: '',
            cameraName: '',
            rtspStreamUrl: '',
            status: 'Active',
            isDeleted: false
          });

          this.isEditMode = false;
          this.cameraIdToEdit = null;

          this.cameraForm.markAsPristine();
          this.cameraForm.markAsUntouched();
          this.cameraForm.updateValueAndValidity();

          this.router.navigate(['/camera-list']);
        },
        () => {
          this.toastService.showError(
            this.isEditMode ? "Failed to update camera!" : "Failed to add camera!"
          );
        }
      );
    }
  }
  loadCameraForEdit(camera: Camera) {
    this.isEditMode = true;
    this.cameraIdToEdit = camera.cameraId;

    this.cameraForm.patchValue({
      branchId: camera.branchId,
      cameraName: camera.cameraName,
      rtspStreamUrl: camera.rtspStreamUrl,
      status: camera.status,
      isDeleted: camera.isDeleted
    });
  }
}
