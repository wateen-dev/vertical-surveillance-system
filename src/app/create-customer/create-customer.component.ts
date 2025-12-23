import { Component, Input } from '@angular/core';
import { CreateCustomer, CreateCustomerModel } from '../models/CreateCustomerModel';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css'
})
export class CreateCustomerComponent {
  @Input() isLoading: boolean = false;
  customerFormState: CreateCustomerModel = {
    name: '',
    ntn: '',
    poc_name: '',
    poc_email: '',
    poc_number: '',
    cnic: '',
    region_id: 0,
    region: '',
    key_account: '',
    industry_id : 0,
    industry: '',
    default_kam_id: 0,
    default_kam: '',
    billing_address: '',
    description: ''
  };
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

constructor() {}
formatCnic() {
  const input = this.customerFormState.cnic.replace(/\D/g, ''); // Remove non-digit characters
  if (input.length <= 5) {
    this.customerFormState.cnic = input;
  } else if (input.length <= 12) {
    this.customerFormState.cnic = `${input.slice(0, 5)}-${input.slice(5, 12)}`;
  } else if (input.length <= 13) {
    this.customerFormState.cnic = `${input.slice(0, 5)}-${input.slice(5, 12)}-${input.slice(12, 13)}`;
  }
}
// Method to handle form submission
  onSubmit(customerForm: NgForm) {
    if (customerForm.valid) {
      this.isLoading = true;
   
      const customerData = new CreateCustomer(
        customerForm.value.name,
        customerForm.value.ntn,
        customerForm.value.poc_name,
        customerForm.value.poc_email,
        customerForm.value.poc_number,
        customerForm.value.cnic,
        customerForm.value.region_id = customerForm.form.value.region?.value,
        customerForm.value.region = customerForm.form.value.region?.viewValue,
        customerForm.value.key_account,
        customerForm.value.industry_id = customerForm.form.value.industry?.value,
        customerForm.value.industry = customerForm.form.value.industry?.viewValue,
        customerForm.value.default_kam_id = customerForm.form.value.default_kam?.value,
        customerForm.value.default_kam = customerForm.form.value.default_kam?.viewValue,
        customerForm.value.billing_address,
        customerForm.value.description
      );
      // Simulate API call or other actions
      setTimeout(() => {
        this.isLoading = false;
        console.log('Customer created successfully!');
      }, 2000);
    }
  }
}
