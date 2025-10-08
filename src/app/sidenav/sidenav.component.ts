import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/DataService';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../service/auth.service';
import { SidenavItem } from './sidenav-data';
import { Employee } from '../models/EmployeeModel'; // Import the Employee model
import { ScreenService } from '../create-screen/service/screenService';
import { Subscription } from 'rxjs';
import { SidenavService } from '../service/sidenav.service';
import { ToastService } from '../service/toast.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {
  private refreshSubscription: Subscription | undefined;
  isSidenavOpened = false;
  sidenavItems: SidenavItem[] = []; 
  openSubmenuIndex: number | null = null;
  employeeContent: any;
  employeeName: string = "";
  isInfoOpen = false;
  // employee: Employee | undefined;
  employee: any | undefined;

  constructor(private router: Router,private dataService: DataService,private screenService:ScreenService,private sidenavService: SidenavService,private toastService: ToastService) {
    this.setActiveSubmenu(this.router.url);
  }
  ngOnInit(): void {
    this.employeeContent = this.dataService.getContent();
    if(this.employeeContent != null){
      this.employee =  {
        // ...this.employeeContent.content
        ...this.employeeContent
      };
     // this.employeeName = this.employeeContent.employeename;
      this.GetScreenDetails();
      this.refreshSubscription = this.sidenavService.refreshSidenav.subscribe(() => {
        this.refreshSidenav(); // Call the method to refresh the sidenav
      });
    }
    else{
      this.logout();
    }
  }
  refreshSidenav() {
    // Logic to refresh or update the sidenav
    this.GetScreenDetails();
  }
  GetScreenDetails(){
    this.screenService.getScreenDetails().subscribe(
      (data) => {
        this.sidenavItems = data; 
        const desiredOrder = [
          'Dashboard',
          'Surveillance System',
          'Registration Center',
          'Administration',
          'Coming Soon'
        ];

        this.sidenavItems = this.sidenavItems.sort(
          (a, b) => desiredOrder.indexOf(a.title) - desiredOrder.indexOf(b.title)
        );
        this.setActiveSubmenu(this.router.url);
      },
      (error) => {
        this.toastService.showError('Failed to fetch sidenav items ' + error.error.toString());
      }
    );
  }
  toggleSubmenu(index: number) {
    this.openSubmenuIndex = this.openSubmenuIndex === index ? null : index;
  }

  isActive(link: string): boolean {
    return this.router.url === link;
  }
  logout() {
    this.dataService.clearContent();
     this.router.navigate(['/login']);
  }
  toggleSidenav() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }
  navigateAndCloseSidenav(link: string) {
    this.router.navigate([link]).then(() => {
      this.isSidenavOpened = false; // Close the sidenav
      this.setActiveSubmenu(link);
    });
  }
  navigateToDashboard() {
    this.router.navigate(['/admin-dashboard']).then(() => {
      this.isSidenavOpened = false; // Close the sidenav after navigation
    });
  }
  setActiveSubmenu(link: string) {
    if (!this.sidenavItems || this.sidenavItems.length === 0) {
      return; // No items to work with
    }
  
    const itemIndex = this.sidenavItems.findIndex(item => 
      item.submenu.some(subItem => subItem.link === link)
    );
  
    if (itemIndex >= 0) {
      this.openSubmenuIndex = itemIndex; // Expand the submenu
    } else {
      this.openSubmenuIndex = null; // Collapse all
    }
  }
  
  toggleInfo() {
    this.isInfoOpen = !this.isInfoOpen;
  }
}
