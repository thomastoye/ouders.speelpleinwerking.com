import { Injectable } from '@angular/core';
import { DataAccessModule } from './data-access.module';
import { Observable } from 'rxjs';
import { Tenant } from '@hoepel.app/types';
import { ApiService } from './api.service';

@Injectable({providedIn: DataAccessModule})
export class PlaygroundsService {
  constructor(
    private apiService: ApiService,
  ) {
  }

  listPlaygrounds(): Observable<ReadonlyArray<Tenant>> {
    return this.apiService.getHoepelAppRoute<ReadonlyArray<Tenant>>('listOrganisations');
  }

  details(playgroundId: string): Observable<Tenant | null> {
    return this.apiService.getHoepelAppRoute<Tenant | null>('organisationDetails', { id: playgroundId });
  }
}
