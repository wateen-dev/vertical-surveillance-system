// toast.service.ts
import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig, ProgressAnimationType } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, title: string = 'Success') {
    this.toastr.success(message, title, this.getDefaultConfig());
  }

  showError(message: string, title: string = 'Error') {
    this.toastr.error(message, title, this.getDefaultConfig());
  }

  showInfo(message: string, title: string = 'Info') {
    this.toastr.info(message, title, this.getDefaultConfig());
  }

  showWarning(message: string, title: string = 'Warning') {
    this.toastr.warning(message, title, this.getDefaultConfig());
  }

  private getDefaultConfig(): Partial<IndividualConfig> {
    return {
      timeOut: 3000,
      positionClass: 'toast-top-right',
      closeButton: false,
      progressBar: true,
      progressAnimation: 'increasing' as ProgressAnimationType, // Ensure this matches the expected type
      tapToDismiss: true,
      enableHtml: true,
    };
  }
}
