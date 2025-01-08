import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth.guard';
import { ReceptionistManagementComponent } from './receptionist-management.component';

const routes: Routes = [
  { path: '', component: ReceptionistManagementComponent, canActivate: [AuthGuard]} // Define the path for the Home component
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionistManagementRoutingModule { }
