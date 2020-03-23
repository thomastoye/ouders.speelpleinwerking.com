import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { TokenInterceptor } from './token.interceptor';
import { API_BASE_URL } from './injection-tokens';
import { GraphQLModule } from '../graphql/graphql.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularFireAuthModule,
    GraphQLModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: API_BASE_URL, useValue: 'https://europe-west1-hoepel-app.cloudfunctions.net/api/speelpleinwerking.com' }
]
})
export class DataAccessModule { }
