import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tenant, Child } from '@hoepel.app/types';
import { PersonFormDialogComponent } from '../../child-form/person-form-dialog/person-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ChildrenService } from '../../data-access/children.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-playground-details',
  templateUrl: './playground-details.component.html',
  styleUrls: ['./playground-details.component.scss']
})
export class PlaygroundDetailsComponent implements OnInit, OnDestroy {
  playground: Tenant;
  children: ReadonlyArray<Child>;

  refresh$ = new Subject<void>();
  saving$ = new Subject<boolean>();
  destroy$ = new Subject<void>();
  error$ = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private childrenService: ChildrenService,
  ) { }

  ngOnInit() {
    this.playground = this.route.snapshot.data.playground as Tenant;
    this.children  = this.route.snapshot.data.children as ReadonlyArray<Child>;

    this.refresh$.pipe(takeUntil(this.destroy$)).subscribe(_ => {
      this.childrenService
        .getChildrenForPlayground(this.route.snapshot.params.playgroundId)
        .subscribe(children => this.children = children);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  editChild(child: Child) {
    this.matDialog.open(PersonFormDialogComponent, {
      panelClass: 'person-form-dialog',
      data: {
        action: 'edit',
        type: 'child',
        person: child,
      }
    }).afterClosed().subscribe((response: { readonly action: string, readonly person: Child }) => {
      if (response) {
        this.saving$.next(true);
        this.error$.next(false);

        this.childrenService
          .updateChildInPlayground(this.route.snapshot.params.playgroundId, child.id, response.person)
          .subscribe(_ => {
            this.refresh$.next();
            this.saving$.next(false);
          }, err => {
            console.error('Error updating child', err);
            this.error$.next(true);
            this.refresh$.next();
            this.saving$.next(false);
          });
      }
    });
  }

  createChild() {
    this.matDialog.open(PersonFormDialogComponent, {
      panelClass: 'person-form-dialog',
      data: {
        action: 'new',
        type: 'child',
      }
    }).afterClosed().subscribe((response: { readonly action: string, readonly person: Child }) => {
      if (response) {
        this.saving$.next(true);
        this.error$.next(false);

        this.childrenService
          .createChildInPlayground(this.route.snapshot.params.playgroundId, response.person)
          .subscribe(_ => {
            this.refresh$.next();
            this.saving$.next(false);
          }, err => {
            console.error('Error while updating child', err);
            this.error$.next(true);
            this.refresh$.next();
            this.saving$.next(false);
          });
      }
    });
  }
}
