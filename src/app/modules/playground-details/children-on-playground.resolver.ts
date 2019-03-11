import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Child } from '@hoepel.app/types';
import { ChildrenService } from '../data-access/children.service';

@Injectable()
export class ChildrenOnPlaygroundResolver implements Resolve<ReadonlyArray<Child>> {
  constructor(
    private childrenService: ChildrenService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ReadonlyArray<Child>> {
    return this.childrenService.getChildrenForPlayground(route.params.id);
  }
}
