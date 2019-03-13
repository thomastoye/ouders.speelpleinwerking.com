import { Injectable } from '@angular/core';
import { DataAccessModule } from './data-access.module';
import { Observable } from 'rxjs';
import { Child, IChild } from '@hoepel.app/types';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable({providedIn: DataAccessModule})
export class ChildrenService {
  constructor(
    private apiService: ApiService,
  ) {
  }

  /**
   * Get children managed by the current user belonging to the organisation with the given id
   */
  getChildrenForPlayground(playgroundId: string): Observable<ReadonlyArray<Child>> {
    return this.apiService.getHoepelAppRoute<ReadonlyArray<IChild>>('childrenManagedByParent', {organisationId: playgroundId})
      .pipe(map(list => list.map(ichild => new Child(ichild))));
  }

  updateChildInPlayground(playgroundId: string, childId: string, child: Child): Observable<void> {
    return this.apiService.getHoepelAppRoute<void>('updateChildByParent', { organisationId: playgroundId, childId, child });
  }

  createChildInPlayground(playgroundId: string, child: Child): Observable<void> {
    return this.apiService.getHoepelAppRoute<void>('createChildByParent', { organisationId: playgroundId, child });
  }
}
