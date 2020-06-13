import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ChildAttendanceService, PossibleAttendancesForChild } from '../../data-access/child-attendance.service';
import { Subject, Observable, of } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatSelectionListChange } from '@angular/material/list';

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
  styleUrls: ['./child-attendance-overview.component.sass']
})
export class ChildAttendanceOverviewComponent implements OnInit, OnDestroy {
  possibleAttendances$: Observable<PossibleAttendancesForChild>;
  destroy$ = new Subject<void>();

  selectedShifts = new Map<string, ShiftDetails>();
  preferredBubbles = new Map<number, string>();

  constructor(
    private childAttendanceService: ChildAttendanceService,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.possibleAttendances$ = this.route.paramMap.pipe(
      switchMap(paramMap => {
      const organisationId = paramMap.get('playgroundId');
      const childId = paramMap.get('childId');

      if (childId == null || organisationId == null) {
        return of() as Observable<PossibleAttendancesForChild>;
      }

      return this.childAttendanceService.possibleAttendancesForChild(
        organisationId,
        childId,
        ).pipe(takeUntil(this.destroy$));
      }));

    this.selectedShifts.clear();
    this.preferredBubbles.clear();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  selectionChange(ev: MatSelectionListChange) {
    if (ev.option.selected) {
      const { id, ...shift} = ev.option.value;
      this.selectedShifts.set(id, shift);
    } else {
      this.selectedShifts.delete(ev.option.value);
    }
  }

  changePreferredBubble(weekNumber: number, bubbleName: string | null): void {
    if (bubbleName == null) {
      this.preferredBubbles.delete(weekNumber);
    } else {
      this.preferredBubbles.set(weekNumber, bubbleName);
    }

    this.changeDetectorRef.detectChanges();
  }

  confirm(): void {
    console.log(this.result);
  }

  get result(): {
    readonly preferredBubbles: Map<number, string>,
    readonly shifts: Map<string, ShiftDetails>
  } {
    return {
      preferredBubbles: this.preferredBubbles,
      shifts: this.selectedShifts,
    };
  }
}
