import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent, canActivate: [AuthGuard]} // Define the path for the Home component
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
