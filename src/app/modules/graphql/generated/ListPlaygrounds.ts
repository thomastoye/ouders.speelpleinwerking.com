/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListPlaygrounds
// ====================================================

export interface ListPlaygrounds_tenants_address {
  readonly __typename: "TenantAddress";
  readonly city: string | null;
}

export interface ListPlaygrounds_tenants {
  readonly __typename: "Tenant";
  readonly id: string;
  readonly name: string | null;
  readonly description: string | null;
  readonly logoSmallUrl: string | null;
  readonly address: ListPlaygrounds_tenants_address | null;
  readonly email: string | null;
  readonly enableOnlineRegistration: boolean;
  readonly enableOnlineEnrollment: boolean;
}

export interface ListPlaygrounds {
  readonly tenants: ReadonlyArray<ListPlaygrounds_tenants>;
}
