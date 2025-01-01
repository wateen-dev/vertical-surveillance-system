import { Component } from '@angular/core';
import { FormFieldConfig } from '../models/form-field-config.model';
import { ValidationPatternsService } from '../service/validation-patterns.service';

@Component({
  selector: 'app-create-new-coustomer',
  templateUrl: './create-new-coustomer.component.html',
  styleUrl: './create-new-coustomer.component.css'
})
export class CreateNewCoustomerComponent {
   // Example options for dropdowns
 regions = [
  { value: 1, viewValue: 'North' },
  { value: 2, viewValue: 'South' },
  { value: 3, viewValue: 'East' },
  { value: 4, viewValue: 'West' }
];
kamOptions = [
  { value: 1, viewValue: 'KAM 1' },
  { value: 2, viewValue: 'KAM 2' },
  { value: 3, viewValue: 'KAM 3' },
];

industries = [
  { value: 1, viewValue: 'IT' },
  { value: 2, viewValue: 'Finance' },
  { value: 3, viewValue: 'Healthcare' }
];
constructor(private validationPatterns: ValidationPatternsService) {}
  formName: string = 'Create Customer'; // Define the heading here
  customerFormFields: FormFieldConfig[] = [
    { label: 'Customer Name', name: 'name', type: 'text', required: true, errorMessage: 'Customer Name is required.',colSize: 'col-md-4' },
    { label: 'NTN Number', name: 'ntn', type: 'text', pattern: this.validationPatterns.patterns.ntn, required: true, errorMessage: 'Valid NTN Number is required.',colSize: 'col-md-4' },
    { label: 'POC Name', name: 'poc_name', type: 'text', required: true, errorMessage: 'POC Name is required.',colSize: 'col-md-4' },
    { label: 'POC Email', name: 'poc_email', type: 'email',pattern: this.validationPatterns.patterns.email, required: true, errorMessage: 'Enter a valid email address.',colSize: 'col-md-4' },
    { label: 'POC Number', name: 'poc_number', type: 'text', pattern: this.validationPatterns.patterns.pocNumber, required: true, errorMessage: 'Please enter a valid phone number (10-15 digits, no symbols).',colSize: 'col-md-4' },
    {
      name: 'cnic',
      label: 'CNIC',
      type: 'text',
      required: true,
      pattern: this.validationPatterns.patterns.cnic,
      placeholder: 'e.g. 12345-1234567-1',
      errorMessage: 'Enter a valid 13-digit CNIC.'
      ,colSize: 'col-md-4'
    },
    {
      name: 'region',
      label: 'Region',
      type: 'select',
      required: true,
      options: this.regions, // Assuming regions are defined in the component
      errorMessage: 'Region selection is required.'
      ,colSize: 'col-md-4'
    },
    {
      name: 'key_account',
      label: 'Key Account',
      type: 'select',
      required: true,
      options: [
        { value: 1, viewValue: 'Yes' },
        { value: 2, viewValue: 'No' }
      ],
      errorMessage: 'Key Account selection is required.'
      ,colSize: 'col-md-4'
    },
    {
      name: 'industry',
      label: 'Industry',
      type: 'select',
      required: true,
      options: this.industries, // Assuming industries are defined in the component
      errorMessage: 'Industry selection is required.'
      ,colSize: 'col-md-4'
    },
    {
      name: 'default_kam',
      label: 'Default KAM',
      type: 'select',
      required: true,
      options: this.kamOptions, // Assuming KAM options are defined in the component
      errorMessage: 'Default KAM is required.'
      ,colSize: 'col-md-12'
    },
    {
      name: 'billing_address',
      label: 'Billing Address',
      type: 'textarea',
      required: true,
      errorMessage: 'Billing Address is required.'
      ,colSize: 'col-md-6'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      errorMessage: 'Description is required.'
      ,colSize: 'col-md-6'
    }
  ];

  formData = {};

  handleFormSubmit(data: any) {
    console.log('Form Submitted:', data);
  }
}
