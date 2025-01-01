import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerticalsurveillancesSystemComponent } from './verticalsurveillances-system.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path: '', component: VerticalsurveillancesSystemComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerticalsurveillancesSystemRoutingModule { }
