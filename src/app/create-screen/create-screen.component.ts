import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CreateScreen, CreateScreenModel } from '../models/CreateScreenModel'
import { DataService } from '../service/DataService';
import { Router } from '@angular/router';
import { ToastService } from '../service/toast.service';
import { AuthService } from '../service/auth.service';
import { ScreenService } from './service/screenService';
import { SidenavService } from '../service/sidenav.service';

// Define the interface for the SharePoint item
interface SharePointItem {
  webUrl: string;
  // Add other fields as needed (for example, ID, title, etc.)
  id?: string;   // Optional field example
  title?: string; // Optional field example
}
@Component({
  selector: 'app-create-screen',
  templateUrl: './create-screen.component.html',
  styleUrl: './create-screen.component.css'
})
export class CreateScreenComponent {
  @Output() screenCreated = new EventEmitter<void>(); // EventEmitter to notify when a screen is created
  allSharePointItems: any[] = [];
  employeeContent: any;
  createdBy: any;
  reposnse_screenDetails: any;
  rsp_apps: any;
  rsp_mat_icons:any;
  appNames: { app_id: number; app_name: string; is_active: boolean }[] = [];
  moduleNames: { module_id: number; module_name: string; is_active: boolean }[] = [];
  icons: { mat_icons_id: number; value: string; viewValue: string }[] = [];
  showOtherField: boolean = false;
  videoUrl: string | null = null;

  @Input() isLoading: boolean = false;
  constructor(private toastService: ToastService, private screenService: ScreenService, private router: Router, private dataService: DataService,private sidenavService: SidenavService) { }
  ngOnInit(): void {
    this.isLoading = true;
    // this.GetSharePointItems();
    // this.GetVideoSharePoint();
    debugger
    this.LoadContentInfo();
    this.GetScreenDetails();  
    this.GetAppNames();
    this.GetModulesNames();
    this.GetIcons();
  }

  onSubmit(form: any) {
    debugger
    let module_id = form.value.module.module_id;
    let module_name = form.value.module.module_name;
    let module_icon = "";
    let routeLink = "/"+form.value.routeLink;
    let sessionLoginID = this.createdBy;

    if (module_name === 'Other') {
      module_id = 0;
      module_name = form.value.otherModule;
      module_icon = form.value.module_icon
    }
    if (form.valid) {
      this.isLoading = true;
      const screenModel: CreateScreen = {
        // ...form.value
        app_id: form.value.app.app_id,
        app_name: form.value.app.app_name,
        module_id: module_id,
        module_name: module_name,
        module_icon: module_icon,
        submenu_name: form.value.subMenuName,
        submenu_icon: form.value.subMenu_icon,
        route_link: routeLink,
        code_desc: form.value.code_desc,
        isactive: form.value.isActive,
        created_by: sessionLoginID.toString(),
        updated_by:sessionLoginID.toString()
      };
      this.screenService.postScreenDetails(screenModel).subscribe(
        (response) => {
          if (response) {
            setTimeout(() => {
              this.isLoading = false;
            }, 2000);
            this.toastService.showSuccess('Screen added successfully!');
            form.resetForm(); // Reset the form after success
            this.resetFields();
            this.sidenavService.notifySidenavRefresh();
          }
        },
        (error) => {
          this.toastService.showError('Error submitting screen details: ' + error.error.toString());
        }
      );

    }
  }
  GetScreenDetails() {
    this.screenService.getScreenDetails().subscribe(
      (response) => {
        this.reposnse_screenDetails = response;
      },
      (error) => {
        this.toastService.showError('Error retrieving screen details: ' + error.error.toString());
      }
    );
  }
  GetAppNames() {
    this.screenService.getAppDetails().subscribe(
      (response) => {
        if(response != null || response != undefined){
          this.appNames = response.filter((app: { is_active: boolean; }) => app.is_active === true);;
        }
        this.rsp_apps = response;
      },
      (error) => {
        this.toastService.showError('Error retrieving app details: ' + error.error.toString());
      }
    );
  }
  // GetSharePointItems() {
  //   this.screenService.getSharePointDetails().subscribe(
  //     (response) => {
  //       if(response != null || response != undefined){
  //         let responseData: SharePointItem[] = response;
  //         debugger
  //         let mp4Data = responseData.filter((item: SharePointItem) => {
  //           return item.webUrl && item.webUrl.endsWith('.mp4');
  //         });

  //         this.allSharePointItems = mp4Data;
  //         console.log('mp4Data', this.allSharePointItems);

          
  //   }
  //     },
  //     (error) => {
  //       this.toastService.showError('Error retrieving app details: ' + error.error.toString());
  //     }
  //   );
  // }
  // GetVideoSharePoint() {
  //   this.screenService.getSharePointVideo().subscribe({
  //     next: (url: string) => {
  //       this.videoUrl = url; // Set the video URL for playback
  //     },
  //     error: (err) => {
  //       console.error('Error fetching video:', err);
  //     },
  // });
  // }
  GetModulesNames() {
    this.screenService.getModulesDetails().subscribe(
      (response) => {
        if(response != null || response != undefined){
          this.moduleNames = response.filter((app: { is_active: boolean; }) => app.is_active === true);;
          this.moduleNames.push({
            module_id: 0,  // Assign a unique id, if needed
            module_name: 'Other',
            is_active: true // or false, depending on your logic
          });
        }
        this.rsp_apps = response;
      },
      (error) => {
        this.toastService.showError('Error retrieving modules details: ' + error.error.toString());
      }
    );
  }
  GetIcons() {
    this.screenService.getMatIcons().subscribe(
      (response) => {
        if(response != null || response != undefined){
          this.icons = response;
        }
        this.rsp_mat_icons = response;
      },
      (error) => {
        this.toastService.showError('Error retrieving mat icons details: ' + error.error.toString());
      }
    );
  }
  resetFields(){
    this.showOtherField = false;
    this.GetModulesNames();
  }
onModuleChange(event: any): void {
  if (event.module_name === 'Other') {
    this.showOtherField = true;
  } else {
    this.showOtherField = false;
  }
}
  LoadContentInfo() {
    this.employeeContent = this.dataService.getContent();
    if (this.employeeContent != null) {
      debugger
      this.createdBy = this.employeeContent.userId;
    }
  }
}

