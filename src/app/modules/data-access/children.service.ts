import { Injectable } from '@angular/core';
import { DataAccessModule } from './data-access.module';
import { Observable } from 'rxjs';
import { Child } from '@hoepel.app/types';
import { ApiService } from './api.service';

@Injectable({ providedIn: DataAccessModule })
export class ChildrenService {
  constructor(
    private apiService: ApiService,
  ) {}

  /**
   * Get children managed by the current user belonging to the organisation with the given id
   */
  getChildrenForPlayground(playgroundId: string): Observable<ReadonlyArray<Child>> {
    return this.apiService.getHoepelAppRoute('childrenManagedByParent', { organisationId: playgroundId });
  }
}
