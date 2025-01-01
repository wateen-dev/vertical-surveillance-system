import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateScreenComponent } from './create-screen.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path: '', component: CreateScreenComponent, canActivate: [AuthGuard]} // Define the path for the Home component
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateScreenRoutingModule { }
