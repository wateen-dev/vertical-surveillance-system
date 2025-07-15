import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniformViolationsComponent } from './uniform-violations.component';
import { AuthGuard } from '../auth.guard';
const routes: Routes = [
  { path: ':value', component: UniformViolationsComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniformViolationsRoutingModule { }
