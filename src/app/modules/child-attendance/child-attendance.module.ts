import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DataAccessModule } from '../data-access/data-access.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChildAttendanceOverviewComponent } from './child-attendance-overview/child-attendance-overview.component';
import { GraphQLModule } from '../graphql/graphql.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChildAttendanceAddForWeekComponent } from './child-attendance-add-for-week/child-attendance-add-for-week.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';


const routes: Routes = [
  {
    path: ':childId', component: ChildAttendanceOverviewComponent
  },
];

@NgModule({
  declarations: [ChildAttendanceOverviewComponent, ChildAttendanceAddForWeekComponent],
  imports: [
    CommonModule,
    DataAccessModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    GraphQLModule,

    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  entryComponents: [
    ChildAttendanceAddForWeekComponent,
  ]
})
export class ChildAttendanceModule { }
