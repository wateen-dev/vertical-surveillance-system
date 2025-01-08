import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './userregistration.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path: '', component: UserRegistrationComponent, canActivate: [AuthGuard]} // Define the path for the Home component
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserregistrationRoutingModule { }
