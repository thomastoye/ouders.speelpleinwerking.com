import { Component, OnInit, Inject } from '@angular/core';
import {
  PossibleAttendancesForChild_parentPlatform_shiftsAvailable,
  PossibleAttendancesForChild_parentPlatform_shiftsAvailable_days_shifts
} from '../../graphql/generated/PossibleAttendancesForChild';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';

export interface ChildAttendanceAddForWeekData {
  readonly childId: string;
  readonly week: PossibleAttendancesForChild_parentPlatform_shiftsAvailable;
}

export type ChildAttendanceAddForWeekReturn = {
  readonly preferredBubbleName: string | null
  readonly childId: string
  readonly selectedShiftIds: readonly string[]
} | null;

@Component({
  selector: 'app-child-attendance-add-for-week',
  templateUrl: './child-attendance-add-for-week.component.html',
  styleUrls: ['./child-attendance-add-for-week.component.sass']
})
export class ChildAttendanceAddForWeekComponent implements OnInit {
  preferredBubbleName: string | null = null;
  selectedShifts = new Map<string, PossibleAttendancesForChild_parentPlatform_shiftsAvailable_days_shifts>();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ChildAttendanceAddForWeekData,
    public dialogRef: MatDialogRef<ChildAttendanceAddForWeekComponent, ChildAttendanceAddForWeekReturn>
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }


  selectionChange(ev: MatSelectionListChange) {
    if (ev.option.selected) {
      const { id, ...shift} = ev.option.value;
      this.selectedShifts.set(id, shift);
    } else {
      this.selectedShifts.delete(ev.option.value.id);
    }
  }

  get week(): PossibleAttendancesForChild_parentPlatform_shiftsAvailable {
    return this.data.week;
  }

  get childId(): string {
    return this.data.childId;
  }

  submit(): void {
    this.dialogRef.close({
      childId: this.childId,
      selectedShiftIds: [...this.selectedShifts.keys()],
      preferredBubbleName: this.preferredBubbleName,
    });
  }
}
