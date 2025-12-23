import { Component, OnInit } from '@angular/core';
import { ScreenService } from '../create-screen/service/screenService';

export interface Lov {
  id:number;
  name: string;
  value: string;
}
@Component({
  selector: 'app-lov-manager',
  templateUrl: './lov-manager.component.html',
  styleUrls: ['./lov-manager.component.css']
})
export class LovManagerComponent implements OnInit {
  lovList: Lov[] = []; // All LOV entries
  filteredLovList: Lov[] = []; // Filtered LOV entries displayed in the table
  lovData: Lov = { id:0,name: '', value: '' }; // Data for the form
  isEditMode: boolean = false; // Toggle between Add and Update modes
  displayedColumns: string[] = ['name', 'value', 'actions'];
  lovCategories: Lov[] = []; // Distinct LOVs for the search dropdown
  selectedLov: Lov | null = null; // Selected LOV for search, null for "All"
  formLovSelection: Lov | 'Other' | null = null; // LOV selected in form dropdown
  showLovNameInput: boolean = false; // Toggle LOV Name input field visibility

  constructor(private screenService: ScreenService) {}

  ngOnInit(): void {
    this.loadLOVs();
  }

  // Load LOVs and set distinct categories
  loadLOVs() {
    this.screenService.getLOVs().subscribe(
      (data) => {
        this.lovList = data;
        this.lovCategories = this.getDistinctLOVs(data); // Set unique LOV categories
        this.filterLovList(); // Initial load with all LOVs
      },
      (error) => {
        console.error('Error loading LOVs:', error);
      }
    );
  }

  // Function to get distinct LOVs by name
  getDistinctLOVs(lovArray: Lov[]): Lov[] {
    const uniqueLOVs = new Map();
    lovArray.forEach(lov => {
      if (!uniqueLOVs.has(lov.name)) {
        uniqueLOVs.set(lov.name, lov); // Use name as key for uniqueness
      }
    });
    return Array.from(uniqueLOVs.values());
  }

  // Filter LOVs based on the selected search category or show all
  filterLovList() {
    this.filteredLovList = this.selectedLov
      ? this.lovList.filter(lov => lov.name === this.selectedLov?.name)
      : this.lovList;
  }

  // Triggered when search dropdown selection changes
  onSearchChange() {
    this.filterLovList();
  }

  // Handle form dropdown selection for LOV
  onLovSelectionChange(event: any) {
    if (event.value === 'Other') {
  
      this.showLovNameInput = true; // Show input for new LOV name
      this.lovData.name = ''; // Clear name for new entry
      this.lovData.id = 0;
      this.lovData.value = '';
      
    } else {
 
      this.showLovNameInput = false; // Hide input for existing LOV selection
      this.lovData = { ...event.value };
      this.lovData.id = 0; // Populate form with selected LOV
      this.lovData.value = '';
    }
  }

  // Handle Add or Update LOV based on mode
  onSubmit() {
    if (this.isEditMode) {
      this.updateLOV();
    } else {
      this.addLOV();
    }
  }

  // Add a new LOV
  addLOV() {
    this.screenService.createLOV(this.lovData).subscribe(
      () => {
        this.loadLOVs();
        this.resetForm();
      },
      (error) => {
        console.error('Error adding LOV:', error);
      }
    );
  }

  // Prepare the form for editing an LOV
  onEdit(lov: Lov) {
    this.isEditMode = true;
    this.formLovSelection = lov; // Set the selected LOV for form dropdown
    this.showLovNameInput = false; // Hide the LOV Name input field
    this.lovData = { ...lov }; // Populate form with LOV data for editing
  }

  // Update an existing LOV
  updateLOV() {
    this.screenService.updateLOV(this.lovData).subscribe(
      () => {
        this.loadLOVs();
        this.resetForm();
      },
      (error) => {
        console.error('Error updating LOV:', error);
      }
    );
  }

  // Reset the form and toggle back to Add mode
  resetForm() {
    this.lovData = { id:0,name: '', value: '' };
    this.selectedLov = null;
    this.formLovSelection = null;
    this.isEditMode = false;
    this.showLovNameInput = false;
  }
}