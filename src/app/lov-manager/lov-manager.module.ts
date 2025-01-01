// lov-manager.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LovManagerComponent } from './lov-manager.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { LovManagerRoutingModule } from './lov-manager-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule, // Import MatTableModule here
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule ,
    LovManagerRoutingModule
  ],
  exports: []
})
export class LovManagerModule {}
