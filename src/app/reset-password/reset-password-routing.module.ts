import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth.guard';
import { ResetPasswordComponent } from './reset-password.component';


const routes: Routes = [
  { path: '', component: ResetPasswordComponent,} // Define the path for the Home component
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReesetPasswordRoutingModule { }
