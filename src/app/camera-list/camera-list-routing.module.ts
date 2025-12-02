import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraListComponent } from './camera-list.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path: '', component: CameraListComponent, canActivate: [AuthGuard]} // Define the path for the Home component
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CameraListRoutingModule { }
