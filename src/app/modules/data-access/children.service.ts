import { Injectable } from '@angular/core';
import { DataAccessModule } from './data-access.module';
import { from, Observable, of } from 'rxjs';
import { Child, IChild } from '@hoepel.app/types';
import { ApiService } from './api.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, flatMap, map, tap } from 'rxjs/operators';

@Injectable({providedIn: DataAccessModule})
export class ChildrenService {
  constructor(
    private apiService: ApiService,
    private db: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
  ) {
  }

  /**
   * Get children managed by the current user belonging to the organisation with the given id
   */
  getChildrenForPlayground(playgroundId: string): Observable<ReadonlyArray<Child>> {
    return this.apiService.getHoepelAppRoute<ReadonlyArray<IChild>>('childrenManagedByParent', {organisationId: playgroundId})
      .pipe(map(list => list.map(ichild => new Child(ichild))));
  }

  getChildrenManagedByUser(): Observable<ReadonlyArray<Child>> {
    return this.angularFireAuth.user.pipe(
      first(),
      flatMap(user => {
        if (!user) {
          return of([]);
        }

        return this.db
          .collection<IChild>('children', ref => ref.where('managedByParents', 'array-contains', user.uid))
          .snapshotChanges()
          .pipe(map(actions => actions.map(action => new Child({id: action.payload.doc.id, ...action.payload.doc.data()}))));
      }));
  }

  addChildManagedByUser(child: Child): Promise<void> {
    return this.angularFireAuth.user.pipe(
      first(),
      flatMap(user => {
        const { id, ...toInsert } = child; // remove id
        const plainObject = JSON.parse(JSON.stringify(toInsert)); // make plain object, without methods etc.
        const withManagedBy = {
          managedByParents: [ user.uid ], // Add managedBy pointing to the current user
          ...plainObject,
        };

        return from(this.db.collection('children').add(withManagedBy).then(_ => {}));
      }),
    ).toPromise();
  }

  updateChildManagedByUser(childId: string, child: Child): Promise<void> {
    return this.angularFireAuth.user.pipe(
      first(),
      flatMap(user => {
        const { id, ...toInsert } = child; // remove id
        const plainObject = JSON.parse(JSON.stringify(toInsert)); // make plain object, without methods etc.

        return from(this.db.collection('children').doc(childId).set(plainObject).then(_ => {}));
      }),
    ).toPromise();
  }
}
