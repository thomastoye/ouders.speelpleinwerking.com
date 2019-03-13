import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Tenant } from '@hoepel.app/types';
import { Observable } from 'rxjs';
import { PlaygroundsService } from '../data-access/playgrounds.service';

@Injectable()
export class PlaygroundDetailsResolver implements Resolve<Tenant> {
  constructor(
    private playgroundService: PlaygroundsService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tenant> {
    return this.playgroundService.details(route.params.playgroundId);
  }
}
