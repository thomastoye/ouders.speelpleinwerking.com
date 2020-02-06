import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { DataAccessModule } from '../data-access/data-access.module';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    DataAccessModule,
    FlexLayoutModule,
    RouterModule,
    AngularFireAuthModule,

    MatCardModule,
    MatButtonModule,
  ]
})
export class HomeModule { }
