/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UnregisterChildAttendanceIntention
// ====================================================

export interface UnregisterChildAttendanceIntention {
  readonly unregisterPendingChildAttendanceIntentionFromParentPlatform: string | null;
}

export interface UnregisterChildAttendanceIntentionVariables {
  readonly organisationId: string;
  readonly childId: string;
  readonly weekNumber: number;
  readonly year: number;
}
