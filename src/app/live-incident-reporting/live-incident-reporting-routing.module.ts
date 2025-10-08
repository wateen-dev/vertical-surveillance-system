import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveIncidentReportingComponent } from './live-incident-reporting.component';
import { AuthGuard } from '../auth.guard';
const routes: Routes = [
  { path: '', component: LiveIncidentReportingComponent, canActivate: [AuthGuard]} // Define the path for the Home component
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveIncidentReportingRoutingModule { }
