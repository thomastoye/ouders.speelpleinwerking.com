import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenComponent } from './children/children.component';
import { MatButtonModule, MatCardModule, MatDialogModule, MatDividerModule, MatIconModule, MatListModule } from '@angular/material';
import { DataAccessModule } from '../data-access/data-access.module';
import { ChildFormModule } from '../child-form/child-form.module';

const routes: Routes = [
  { path: '', component: ChildrenComponent },
];

@NgModule({
  declarations: [
    ChildrenComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataAccessModule,
    ChildFormModule,

    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
  ],
  providers: [
  ]
})
export class ChildrenModule { }
