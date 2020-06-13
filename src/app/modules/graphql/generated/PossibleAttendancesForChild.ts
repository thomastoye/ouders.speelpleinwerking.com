/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ChildAttendanceIntentionStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: PossibleAttendancesForChild
// ====================================================

export interface PossibleAttendancesForChild_parentPlatform_shiftsAvailable_possibleBubbles {
  readonly __typename: "SelectableBubbleForWeek";
  readonly name: string;
  readonly spotsLeft: number | null;
  readonly totalSpots: number;
}

export interface PossibleAttendancesForChild_parentPlatform_shiftsAvailable_attendanceIntentionsForChild_shifts {
  readonly __typename: "ChildAttendanceIntentionShift";
  readonly id: string;
}

export interface PossibleAttendancesForChild_parentPlatform_shiftsAvailable_attendanceIntentionsForChild {
  readonly __typename: "ChildAttendanceIntentionForWeek";
  readonly childId: string;
  readonly status: ChildAttendanceIntentionStatus;
  readonly preferredBubbleName: string | null;
  readonly shifts: ReadonlyArray<PossibleAttendancesForChild_parentPlatform_shiftsAvailable_attendanceIntentionsForChild_shifts>;
}

export interface PossibleAttendancesForChild_parentPlatform_shiftsAvailable_days_shifts {
  readonly __typename: "ShiftChildCanAttend";
  readonly id: string;
  readonly description: string;
  readonly location: string;
  readonly start: any;
  readonly end: any;
  readonly durationFormatted: string;
  readonly kind: string;
  readonly price: string;
}

export interface PossibleAttendancesForChild_parentPlatform_shiftsAvailable_days {
  readonly __typename: "DayWithShiftsChildrenCanAttend";
  readonly day: any;
  readonly dayFormatted: string;
  readonly shifts: ReadonlyArray<PossibleAttendancesForChild_parentPlatform_shiftsAvailable_days_shifts>;
}

export interface PossibleAttendancesForChild_parentPlatform_shiftsAvailable {
  readonly __typename: "ShiftsGroupedByWeek";
  readonly weekNumber: number;
  readonly weekDescription: string;
  readonly year: number;
  readonly possibleBubbles: ReadonlyArray<PossibleAttendancesForChild_parentPlatform_shiftsAvailable_possibleBubbles>;
  readonly attendanceIntentionsForChild: PossibleAttendancesForChild_parentPlatform_shiftsAvailable_attendanceIntentionsForChild | null;
  readonly days: ReadonlyArray<PossibleAttendancesForChild_parentPlatform_shiftsAvailable_days>;
}

export interface PossibleAttendancesForChild_parentPlatform {
  readonly __typename: "ParentPlatform";
  readonly shiftsAvailable: ReadonlyArray<PossibleAttendancesForChild_parentPlatform_shiftsAvailable>;
}

export interface PossibleAttendancesForChild {
  readonly parentPlatform: PossibleAttendancesForChild_parentPlatform;
}

export interface PossibleAttendancesForChildVariables {
  readonly organisationId: string;
  readonly childId: string;
  readonly year: number;
}
