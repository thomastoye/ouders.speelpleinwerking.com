/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ChildAttendanceIntentionStatus {
  accepted = "accepted",
  pending = "pending",
  rejected = "rejected",
}

export interface ChildManagedByParentAddressInput {
  readonly street?: string | null;
  readonly number?: string | null;
  readonly zipCode?: number | null;
  readonly city?: string | null;
}

export interface ChildManagedByParentInput {
  readonly firstName: string;
  readonly lastName: string;
  readonly address: ChildManagedByParentAddressInput;
  readonly phone: ReadonlyArray<ChildManagedByParentPhoneContactInput>;
  readonly email: ReadonlyArray<string>;
  readonly gender?: string | null;
  readonly birthDate?: any | null;
  readonly remarks: string;
  readonly uitpasNumber?: string | null;
}

export interface ChildManagedByParentPhoneContactInput {
  readonly phoneNumber: string;
  readonly comment?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
