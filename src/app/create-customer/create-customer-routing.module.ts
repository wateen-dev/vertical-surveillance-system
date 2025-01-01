import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCustomerComponent } from './create-customer.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path: '', component:CreateCustomerComponent, canActivate: [AuthGuard]} // Define the path for the Home component
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateCustomerRoutingModule { }
