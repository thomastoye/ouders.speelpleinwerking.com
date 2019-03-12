import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PersonFormDialogComponent } from '../../child-form/person-form-dialog/person-form-dialog.component';
import { Child } from '@hoepel.app/types';
import { Observable, Subject } from 'rxjs';
import { ChildrenService } from '../../data-access/children.service';
import { takeUntil } from 'rxjs/operators';
import { defineBase } from '@angular/core/src/render3';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss']
})
export class ChildrenComponent implements OnInit, OnDestroy {
  children$: Observable<ReadonlyArray<Child>>;
  destroy$ = new Subject<void>();

  constructor(
    private matDialog: MatDialog,
    private childrenService: ChildrenService,
  ) { }

  ngOnInit(): void {
    this.children$ = this.childrenService.getChildrenManagedByUser().pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
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
        this.childrenService.addChildManagedByUser(response.person);
      }
    });
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
        this.childrenService.updateChildManagedByUser(child.id, response.person);
      }
    });
  }
}
