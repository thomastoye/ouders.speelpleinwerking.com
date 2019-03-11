import { Injectable } from '@angular/core';
import { DataAccessModule } from './data-access.module';
import { Observable } from 'rxjs';
import { first, flatMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({ providedIn: DataAccessModule })
export class ApiService {
  constructor(
    private http: HttpClient,
    private angularFireAuth: AngularFireAuth,
  ) {}

  getHoepelAppRoute<T>(functionName: string): Observable<T> {
    return this.angularFireAuth.idToken.pipe(
      first(),
      flatMap((token) => {
        return this.http.post(`https://europe-west1-hoepel-app.cloudfunctions.net/${functionName}`, {data: { token }}, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
      }),
      map(response => (response as { readonly result: T }).result),
    );
  }

}
