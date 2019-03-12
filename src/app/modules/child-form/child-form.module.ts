import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonFormComponent } from './person-form/person-form.component';
import {
  MatToolbarModule,
  MatTooltipModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatCheckboxModule,
  MatInputModule, MatIconModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PersonFormDialogComponent } from './person-form-dialog/person-form-dialog.component';

@NgModule({
  declarations: [
    PersonFormComponent,
    PersonFormDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule,

    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
  ],
  exports: [
    PersonFormComponent,
  ],
  entryComponents: [
    PersonFormDialogComponent,
  ]
})
export class ChildFormModule { }
