/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterChildAttendanceIntention
// ====================================================

export interface RegisterChildAttendanceIntention {
  readonly registerChildAttendanceIntentionFromParentPlatform: string | null;
}

export interface RegisterChildAttendanceIntentionVariables {
  readonly organisationId: string;
  readonly childId: string;
  readonly preferredBubbleName?: string | null;
  readonly weekNumber: number;
  readonly year: number;
  readonly shifts: ReadonlyArray<string>;
}
