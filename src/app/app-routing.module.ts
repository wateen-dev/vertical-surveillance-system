import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '', 
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'vertical-surveillances-system', 
    loadChildren: () => import('./verticalsurveillances-system/verticalsurveillances-system.module').then(m => m.VerticalsurveillancesSystemModule)
  },
  {
    path: 'login', 
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'dashboard', 
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'administration', 
    loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule)
  },
  {
    path: 'createscreen', 
    loadChildren: () => import('./create-screen/create-screen.module').then(m => m.CreateScreenModule)
  },
  {
    path: 'createcustomer', 
    loadChildren: () => import('./create-customer/create-customer.module').then(m => m.CreateCustomerModule)
  },
  {
    path: 'createnewcustomer', 
    loadChildren: () => import('./create-new-coustomer/create-new-customer.module').then(m => m.CreateNewCustomerModule)
  },
  {
    path: 'createopportunity', 
    loadChildren: () => import('./create-opportunity/create-opportunity.module').then(m => m.CreateOpportunityModule)
  },
  {
    path: 'createlov', 
    loadChildren: () => import('./lov-manager/lov-manager.module').then(m => m.LovManagerModule)
  },
  {
    path: 'custom-services', 
    loadChildren: () => import('./custom-services/custom-services.module').then(m => m.CustomServicesModule)
  },
  {
    path: 'employee-registration', 
    loadChildren: () => import('./employeeregistration/employeeregistration.module').then(m => m.EmployeeregistrationModule)
  },
  {
    path: 'tenant-registration', 
    loadChildren: () => import('./tenantregistration/tenantregistration.module').then(m => m.TenantregistrationModule)
  },
  {
    path: 'user-registration', 
    loadChildren: () => import('./userregistration/userregistration.module').then(m => m.UserregistrationModule)
  },
  {
    path: 'receptionistmanagement', 
    loadChildren: () => import('./receptionist-management/receptionist-management.module').then(m=>m.ReceptionistManagementModule)
  },
  {
    path: 'visitor-registration', 
    loadChildren: () => import('./visitorregistration/visitorregistration.module').then(m => m.VisitorregistrationModule)
  },
  {
    path: 'uniform-violations',
    loadChildren: () => import('./uniform-violations/uniform-violations.module').then(m => m.UniformViolationsModule)
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule)
  },
  {
    path: 'live-incidents',
    loadChildren: () => import('./live-incidents/live-incident.module').then(m => m.LiveIncidentModule)
  },
  {
    path: 'live-incident-reporting',
    loadChildren: () => import('./live-incident-reporting/live-incident-reporting.module').then(m => m.LiveIncidentReportingModule)
  },
  {
    path: 'staff-perfomance',
    loadChildren: () => import('./staff-perfomance/staff-perfomance.module').then(m => m.StaffPerfomanceModule)
  },
  {
    path: 'attendance-logs',
    loadChildren: () => import('./attendance-logs/attendance-logs.module').then(m => m.AttendanceLogsModule)
  },
  {
    path: 'reset-password/:id', 
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: 'add-branch',
    loadChildren: () => import('./add-branch/add-branch.module').then(m => m.AddBranchModule)
  },
  {
    path: 'branch-list',
    loadChildren: () => import('./branch-list/branch-list.module').then(m => m.BranchListModule)
  },
  {
    path: 'add-camera',
    loadChildren: () => import('./add-camera/add-camera.module').then(m => m.AddCameraModule)
  },
  {
    path: 'camera-list',
    loadChildren: () => import('./camera-list/camera-list.module').then(m => m.CameraListModule)
  },
  {
    path: 'add-company',
    loadChildren: () => import('./add-company/add-company.module').then(m => m.AddCompanyModule)
  },
  {
    path: 'company-list',
    loadChildren: () => import('./company-list/company-list.module').then(m => m.CompanyListModule)
  },
  {
    path: 'add-violation',
    loadChildren: () => import('./add-violation/add-violation.module').then(m => m.AddViolationModule)
  },
  {
    path: 'violation-list',
    loadChildren: () => import('./violation-list/violation-list.module').then(m => m.ViolationListModule)
  },
  {
    path: 'add-roles',
    loadChildren: () => import('./add-roles/add-roles.module').then(m => m.AddRolesModule)
  },
  {
    path: 'roles-list',
    loadChildren: () => import('./roles-list/roles-list.module').then(m => m.RolesListModule)
  },
  {
    path: 'interface-forms',
    loadChildren: () => import('./interface-forms/interface-forms.module').then(m => m.InterfaceFormsModule)
  },
  // You can add other routes here
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Optional redirect,
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
