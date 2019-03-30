import { Injectable, Injector } from '@angular/core';
import { DataAccessModule } from './data-access.module';
import { Observable } from 'rxjs';
import { Tenant } from '@hoepel.app/types';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from './injection-tokens';

@Injectable({providedIn: DataAccessModule})
export class PlaygroundsService {
  private readonly apiBase: string;

  constructor(
    private http: HttpClient,
    private injector: Injector,
  ) {
    this.apiBase = this.injector.get(API_BASE_URL);
  }

  listPlaygrounds(): Observable<ReadonlyArray<Tenant>> {
    return this.http
      .get<ReadonlyArray<Tenant>>(`${this.apiBase}/organisation`);
  }

  details(playgroundId: string): Observable<Tenant | null> {
    return this.http.get<Tenant | null>(
      `${this.apiBase}/organisation/${playgroundId}`
    );
  }
}
