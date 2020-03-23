import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PlaygroundsService, Playground } from '../data-access/playgrounds.service';

@Injectable()
export class PlaygroundDetailsResolver implements Resolve<Playground | null> {
  constructor(
    private playgroundService: PlaygroundsService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Playground | null> {
    return this.playgroundService.details(route.params.playgroundId);
  }
}
