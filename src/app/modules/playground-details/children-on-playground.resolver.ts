import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ChildrenService, ManagedChild } from '../data-access/children.service';

@Injectable()
export class ChildrenOnPlaygroundResolver implements Resolve<readonly ManagedChild[]> {
  constructor(
    private childrenService: ChildrenService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<readonly ManagedChild[]> {
    return this.childrenService.getChildrenForPlayground(route.params.playgroundId);
  }
}
