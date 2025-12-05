import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from './company-list.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path: '', component: CompanyListComponent, canActivate: [AuthGuard]} // Define the path for the Home component
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyListRoutingModule { }
