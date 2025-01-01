import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantregistrationComponent } from './tenantregistration.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path: '', component: TenantregistrationComponent, canActivate: [AuthGuard]} // Define the path for the Home component
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantregistrationRoutingModule { }
