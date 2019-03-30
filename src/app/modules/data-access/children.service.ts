import { Injectable, Injector } from '@angular/core';
import { DataAccessModule } from './data-access.module';
import { Observable } from 'rxjs';
import { Child } from '@hoepel.app/types';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from './injection-tokens';

@Injectable({providedIn: DataAccessModule})
export class ChildrenService {
  private readonly apiBase: string;

  constructor(
    private http: HttpClient,
    private injector: Injector,
  ) {
    this.apiBase = this.injector.get(API_BASE_URL);
  }

  /**
   * Get children managed by the current user belonging to the organisation with the given id
   */
  getChildrenForPlayground(organisationId: string): Observable<ReadonlyArray<Child>> {
    return this.http
      .get<ReadonlyArray<Child>>(`${this.apiBase}/organisation/${organisationId}/children/managed-by/me`)
      .pipe(map(list => list.map(ichild => new Child(ichild))));
  }

  updateChildInPlayground(organisationId: string, childId: string, child: Child): Observable<void> {
    return this.http.put<void>(`${this.apiBase}/organisation/${organisationId}/children/${childId}`, { child });
  }

  createChildInPlayground(organisationId: string, child: Child): Observable<void> {
    return this.http.post<void>(`${this.apiBase}/organisation/${organisationId}/children/`, { child });
  }
}
