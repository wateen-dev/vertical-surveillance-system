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
    path: 'reset-password/:id', 
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  
  // You can add other routes here
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Optional redirect,
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
