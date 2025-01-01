import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateCustomerComponent } from '../create-customer/create-customer.component'; // Import your modal component

@Component({
  selector: 'app-create-opportunity',
  templateUrl: './create-opportunity.component.html',
  styleUrl: './create-opportunity.component.css'
})
export class CreateOpportunityComponent {
  selectedTabIndex: number = 0;
  @Input() isLoading: boolean = false;
  tabDisabled = [false, true, true, true, true]; // Initially only the first tab is enabled
  activeTabIndex = 0; // Track the active tab
  formStoreData: any = {}; // Initialize the property to store form data
  tabs = [
    { label: 'Prospect' },
    { label: 'Solution Design' },
    { label: 'Initial Quote' },
    { label: 'Final Quote' },
    { label: 'Decision' },
  ];
  // Sample dropdown data for Products, Sales KAM, Win Chance, Currency
  products = [
    { value: 'product1', viewValue: 'Product 1' },
    { value: 'product2', viewValue: 'Product 2' },
  ];
  salesKAMs = [
    { value: 'kam1', viewValue: 'KAM 1' },
    { value: 'kam2', viewValue: 'KAM 2' },
  ];
  winChances = [
    { value: 'high', viewValue: 'High' },
    { value: 'medium', viewValue: 'Medium' },
    { value: 'low', viewValue: 'Low' },
  ];
  currencies = [
    { value: 'usd', viewValue: 'USD' },
    { value: 'eur', viewValue: 'EUR' },
  ];
  customers = [
    { value: 'customer1', viewValue: 'Customer One' },
    { value: 'customer2', viewValue: 'Customer Two' },
    // Add more customers as needed
];

  constructor(private fb: FormBuilder,public dialog: MatDialog) {
  }
  openCustomerModal(event: MouseEvent): void {
    event.stopPropagation(); // Prevent the mat-select from opening
    const dialogRef = this.dialog.open(CreateCustomerComponent, {
        height: '95%', // Adjust height as necessary
        panelClass: 'custom-dialog', // Custom class for styling
        // Other modal options if necessary
    });

    // Optional: Subscribe to the afterClosed event if you need to do something when the dialog closes
    dialogRef.afterClosed().subscribe(result => {
        // Handle result if needed
    });
}
  // Event handler for tab changes
  onTabChange(event: any): void {
    this.selectedTabIndex = event.index;
    console.log('Selected Tab Index:', this.selectedTabIndex);
    // Additional logic can be added here to handle each tab's data if necessary
  }

  // Calculates TCV based on OTC, MRC, No of Links, and Contract Months
  calculateTCV(opportunityForm: NgForm): number {
    const otc = opportunityForm.controls['otc']?.value || 0;
    const mrc = opportunityForm.controls['mrc']?.value || 0;
    const noOfLinks = opportunityForm.controls['no_of_links']?.value || 0;
    const contractMonths = opportunityForm.controls['contract_months']?.value || 0;

    const tcv = otc + (mrc * noOfLinks * contractMonths);
    
    // Set the TCV value back to the form
    opportunityForm.controls['tcv']?.setValue(tcv);
    
    return tcv;
}

  onSubmit(opportunityForm: any) {
    if (opportunityForm.valid) {
      this.isLoading = true;
      const formData = opportunityForm.value;
      this.formStoreData = opportunityForm.value; // Store form data
      console.log('Opportunity Data:', formData);
    
      this.ChangesOccurWhenMovingToNextTab();
     

      // Simulate API call or other actions
      setTimeout(() => {
        this.isLoading = false;
        console.log('Customer created successfully!');
      }, 2000);
    }
  }
  ChangesOccurWhenMovingToNextTab() {
    // Disable all tabs after the current one
    for (let i = this.activeTabIndex + 1; i < this.tabDisabled.length; i++) {
      this.tabDisabled[i] = true;
    }
    
    // Enable all tabs before the current one
    for (let i = 0; i < this.activeTabIndex; i++) {
      this.tabDisabled[i] = false;
    }
    // Enable the next tab and move to it if it exists
    if (this.activeTabIndex < this.tabDisabled.length - 1) {
      this.tabDisabled[this.activeTabIndex + 1] = false;
      this.activeTabIndex += 1;
    }
    // Set Form State with New Data or other actions as needed
  }  
}
