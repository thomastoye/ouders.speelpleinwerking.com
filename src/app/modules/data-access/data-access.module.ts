import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [
    { provide: FirestoreSettingsToken, useValue: {} },
]
})
export class DataAccessModule { }
