import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {
  ChildAttendanceService,
  PossibleAttendancesForChild,
} from '../../data-access/child-attendance.service';
import { Subject, Observable, of, combineLatest } from 'rxjs';
import { takeUntil, switchMap, map, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { PossibleAttendancesForChild_parentPlatform_shiftsAvailable } from '../../graphql/generated/PossibleAttendancesForChild';
import { MatDialog } from '@angular/material/dialog';
import {
  ChildAttendanceAddForWeekComponent,
  ChildAttendanceAddForWeekData,
  ChildAttendanceAddForWeekReturn,
} from '../child-attendance-add-for-week/child-attendance-add-for-week.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface ShiftDetails {
  readonly id: string;
  readonly description: string;
  readonly location: string;
  readonly start: any;
  readonly end: any;
  readonly durationFormatted: string;
  readonly kind: string;
  readonly price: string;
}

@Component({
  selector: 'app-child-attendance-overview',
  templateUrl: './child-attendance-overview.component.html',
  styleUrls: ['./child-attendance-overview.component.sass'],
})
export class ChildAttendanceOverviewComponent implements OnInit, OnDestroy {
  possibleAttendances$: Observable<PossibleAttendancesForChild>;
  destroy$ = new Subject<void>();
  refresh$ = new Subject<void>();
  organisationId$: Observable<string | null>;
  childId$: Observable<string | null>;

  selectedShifts = new Map<string, ShiftDetails>();
  preferredBubbles = new Map<number, string>();

  constructor(
    private childAttendanceService: ChildAttendanceService,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private matSnack: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.organisationId$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('playgroundId'))
    );
    this.childId$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('childId'))
    );

    this.possibleAttendances$ = combineLatest([
      this.organisationId$,
      this.childId$,
      this.refresh$.pipe(startWith([])),
    ]).pipe(switchMap(([organisationId, childId, refresh]) => {
      if (childId == null || organisationId == null) {
        return of() as Observable<PossibleAttendancesForChild>;
      }

      return this.childAttendanceService
        .possibleAttendancesForChild(organisationId, childId)
        .pipe(takeUntil(this.destroy$));
    }));

    this.selectedShifts.clear();
    this.preferredBubbles.clear();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  async addAttendanceIntentionForWeek(
    childId: string,
    week: PossibleAttendancesForChild_parentPlatform_shiftsAvailable
  ): Promise<void> {
    this.matDialog.open<
      ChildAttendanceAddForWeekComponent,
      ChildAttendanceAddForWeekData,
      ChildAttendanceAddForWeekReturn
    >(ChildAttendanceAddForWeekComponent, {
      data: {
        childId,
        week,
      },
    }).afterClosed().subscribe(result => {
      if (result == null) {
        return;
      }

      const organisationId = this.route.snapshot.paramMap.get('playgroundId');

      if (organisationId == null) {
        throw new Error(`No organisation id found when trying to add child attendance intention`);
      }

      this.childAttendanceService.registerAttendanceIntention(
        organisationId,
        result.childId,
        week.year,
        week.weekNumber,
        result.preferredBubbleName,
        result.selectedShiftIds,
      ).subscribe(next => {
        this.refresh$.next();
        this.matSnack.open('Inschrijving toegevoegd!', undefined, { duration: 5000 });
      }, error => {
          this.matSnack.open('Kon inschrijving niet toevoegen... Probeer opnieuw', undefined, { duration: 5000 });
          console.error('Error when adding child attendance intention', error);
          this.refresh$.next();
      });
    });
  }

  removePendingAttendanceIntention(childId: string, year: number, weekNumber: number) {
    const organisationId = this.route.snapshot.paramMap.get('playgroundId');

    if (organisationId == null) {
      throw new Error(`No organisation id found when trying to remove pending child attendance intention`);
    }

    this.childAttendanceService.unregisterAttendanceIntention(organisationId, childId, year, weekNumber).subscribe(next => {
      this.refresh$.next();
      this.matSnack.open('Verwijderd!', undefined, { duration: 5000 });
    }, error => {
      this.matSnack.open('Kon inschrijving niet verwijderen... Probeer opnieuw');
      console.error('Error when removing child attendance intention', error);
      this.refresh$.next();
    });
  }
}
