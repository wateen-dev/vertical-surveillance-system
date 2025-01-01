import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormFieldConfig } from '../models/form-field-config.model';
@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrl: './custom-form.component.css'
})
export class CustomFormComponent {
  @Input() formName: string = '';  // Define the input property for the form name
  @Input() fields: FormFieldConfig[] = [];
  @Input() formData: any = {};
  @Output() formDataChange = new EventEmitter<any>();  // Add this line
  @Output() formSubmit = new EventEmitter<any>();

  // Emit changes to formData
  updateFormData(fieldName: string, value: any) {
    if (fieldName === 'cnic') {
      this.formatCnic(fieldName, value); // Call formatCnic for CNIC field
    } else {
      this.formData[fieldName] = value; // For other fields, update normally
    }
    this.formDataChange.emit(this.formData);  // Emit updated formData
  }
  formatCnic(fieldName: string, value: string) {
    debugger
    const input = value.replace(/\D/g, ''); // Remove non-digit characters
  
    if (input.length <= 5) {
      this.formData[fieldName] = input;
    } else if (input.length <= 12) {
      this.formData[fieldName] = `${input.slice(0, 5)}-${input.slice(5, 12)}`;
    } else if (input.length <= 13) {
      this.formData[fieldName] = `${input.slice(0, 5)}-${input.slice(5, 12)}-${input.slice(12, 13)}`;
    }
  }
  
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.formSubmit.emit(this.formData);
    }
  }

  
}
