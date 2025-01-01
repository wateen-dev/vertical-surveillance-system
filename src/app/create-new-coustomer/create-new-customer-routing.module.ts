import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewCoustomerComponent } from './create-new-coustomer.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path: '', component:CreateNewCoustomerComponent, canActivate: [AuthGuard]} // Define the path for the Home component
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateNewCustomerRoutingModule { }
