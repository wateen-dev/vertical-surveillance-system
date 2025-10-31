import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-filters',
  templateUrl: './dashboard-filters.component.html',
  styleUrl: './dashboard-filters.component.css'
})
export class DashboardFiltersComponent {
  countryList = ['Pakistan', 'UAE', 'Saudi Arabia'];
  cityList = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad'];
  areaList = ['Y Block', 'MM Alam', 'Phase 5', 'Clifton', 'Blue Area'];
  outletTypes = ['All Outlets', 'Flagship Store', 'Mall Kiosk', 'Studio'];

  selectedCountry = 'Pakistan';
  selectedCity = 'Lahore';
  selectedArea = 'Y Block';
  selectedOutletType = 'All Outlets';

  applyFilters() {
    console.log('Applied Filters:', {
      country: this.selectedCountry,
      city: this.selectedCity,
      area: this.selectedArea,
      outletType: this.selectedOutletType
    });
    // Here you can emit this data to a parent component or call your API
  }
}