import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesListComponent } from '../roles-list/roles-list.component';
import { AuthGuard } from '../auth.guard';
import { AddRolesComponent } from './add-roles.component';
const routes: Routes = [
  { path: '', component: AddRolesComponent, canActivate: [AuthGuard]} // Define the path for the Home component
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRolesRoutingModule { }
