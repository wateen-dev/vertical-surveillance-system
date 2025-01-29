import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeRegistrationService } from '../employeeregistration/service/employeeregistrationservice';
import { MatPaginator } from '@angular/material/paginator';
import { ToastService } from '../service/toast.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-vertical-surveillances-system',
  templateUrl: './verticalsurveillances-system.component.html',
  styleUrls: ['./verticalsurveillances-system.component.css'],
})
export class VerticalsurveillancesSystemComponent {
  // Dropdown and Search Data
  selectedCategory = '';
  selectedCompany = ''; // Empty for no filter
  searchQuery = '';
  displayedColumns: string[] = ['id','name', 'company','category', 'phone'];
  dataSource = new MatTableDataSource<any>();
  logColumns = ['date', 'checkInTime','checkOutTime'];
  selectedEmployee: any = null;
  filteredLogs: any[] = [];
  accessStatus: 'Allowed' | 'Revoked' = 'Allowed';
  isPresent: boolean = false;
  selectedCard: string = '';
  ds:any;
  lastSyncedTime: string = '';
  private apiUrl = environment.apiUrl;           
      private local_apiUrl = environment.localApiUrl;
      imagePath1Base64:any;
  constructor(private verticalService: EmployeeRegistrationService,private route: ActivatedRoute,private toastService: ToastService,private http: HttpClient) {
    debugger;
    this.updateLastSyncedTime();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    debugger;
    this.route.queryParams.subscribe((params) => {
      this.selectedCard = params['card'];
      if(this.selectedCard=='Employees')
      this.selectedCategory='employee'
    if(this.selectedCard=='Visitors')
      this.selectedCategory='visitor'
     if(this.selectedCard=='Executives')
      this.selectedCategory='tenant'
    if(this.selectedCard!=undefined)
      this.isPresent=true;
      console.log('Selected Card:', this.selectedCard); // Debugging output
    });
    this.loadData();
    // this.checkInLogs.paginator = this.paginator;
  }

refreshComponent(){
  this.selectedCard=''
  this.selectedCategory=''
  this.selectedCompany=''
  this.searchQuery=''
  this.selectedEmployee=null
  this.filteredLogs=[]
  this.loadData();
 
  

}
 
refreshLogs(){
    this.onRowClick(this.selectedEmployee)
}
  updateLastSyncedTime(): void {
    const now = new Date();
    this.lastSyncedTime = `${now.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  loadData(): void {
    this.verticalService.fetchAllData().subscribe((data:any) => {
      this.dataSource.data = data.result;
      this.filterTable(); // Apply default filter
    });
  }
  fetchImages(path:any): void {
 
    debugger
        const fileName = path.split("\\").pop();
        
            this.http.get(this.local_apiUrl+`Vertical/GetImagesBase64?fileName=${fileName}`).subscribe((data:any) => {
           debugger;
              this.imagePath1Base64 = data.thumbnailBase64;
           
            },
              (error) => {
                console.error('Error fetching thumbnail:', error);
              }
            );
          }
  onRowClick(row: any) {
    debugger;
    if(this.selectedCategory!='visitor'){
    this.fetchImages(row.profilePicture)
    this.selectedEmployee = row;
    this.accessStatus = 'Allowed';
    // this.filteredLogs = this.checkInLogs.filter(log => log.name.split('-')[1] === row.name);
    this.verticalService.fetchCheckInLogs(row.id).subscribe(
      (logs: any[]) => {
        debugger
        this.filteredLogs = logs; // Assign API response to filteredLogs
      },
      (error) => {
        console.error('Error fetching check-in logs:', error);
        this.filteredLogs = []; // Clear logs on error
      }
    );
  }
  else
  {
    if (row.profilePicture)
      this.fetchImages(row.profilePicture)
    this.selectedEmployee = row;
    this.accessStatus = 'Allowed';
    this.verticalService.fetchCheckInLogsVisitors(row.id).subscribe(
      (logs: any[]) => {
        debugger
        this.filteredLogs = logs; // Assign API response to filteredLogs
      },
      (error) => {
        console.error('Error fetching check-in logs:', error);
        this.filteredLogs = []; // Clear logs on error
      }
    );

  }
  }
  allowAccess() {
    this.accessStatus = 'Allowed';
    
    this.toastService.showSuccess('Access has been allowed.');
  }

  revokeAccess() {
    this.accessStatus = 'Revoked';
   
    this.toastService.showSuccess('Access has been revoked.');
  }
 filterTable(): void {
    const categoryFilter = this.selectedCategory.toLowerCase();
    const companyFilter = this.selectedCompany.toLowerCase();
    const searchFilter = this.searchQuery.toLowerCase();

    this.ds = this.dataSource.data.filter((item) => {
      const matchesCompany =
        !companyFilter || item.company.toLowerCase() === companyFilter;
      const matchesCategory =
        !categoryFilter || item.category.toLowerCase() === categoryFilter;
      const matchesSearch =
        item.name.toLowerCase().includes(searchFilter) ||
        item.email.toLowerCase().includes(searchFilter) ||
        item.phone.includes(searchFilter);
      const matchesPresent = this.isPresent
        ? item.status === 'Present' // Assuming the status property holds "Present"/"Absent" information
        : true;

      return matchesCompany && matchesCategory && matchesSearch && matchesPresent;
    });
  }
}
