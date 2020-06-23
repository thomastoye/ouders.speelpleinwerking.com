import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  PossibleAttendancesForChild_parentPlatform_shiftsAvailable_attendanceIntentionsForChild,
  PossibleAttendancesForChild_parentPlatform_shiftsAvailable_attendanceIntentionsForChild_shifts
} from '../../graphql/generated/PossibleAttendancesForChild';
import { DayDate } from '@hoepel.app/types';

@Component({
  selector: 'app-child-attendance-details-dialog',
  templateUrl: './child-attendance-details-dialog.component.html',
  styleUrls: ['./child-attendance-details-dialog.component.sass']
})
export class ChildAttendanceDetailsDialogComponent implements OnInit {
  shifts: readonly PossibleAttendancesForChild_parentPlatform_shiftsAvailable_attendanceIntentionsForChild_shifts[]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PossibleAttendancesForChild_parentPlatform_shiftsAvailable_attendanceIntentionsForChild,
  ) {
    console.log(data)

    this.shifts = [...data.shifts]
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  }

  ngOnInit(): void {
  }

  displayDayDate(dayId: string): string {
    return DayDate.fromDayId(dayId).toDDMMYYYY()
  }
}
