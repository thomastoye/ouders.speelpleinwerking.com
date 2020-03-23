/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListPlaygrounds
// ====================================================

export interface ListPlaygrounds_tenants_address {
  __typename: "TenantAddress";
  city: string | null;
}

export interface ListPlaygrounds_tenants {
  __typename: "Tenant";
  id: string;
  name: string | null;
  description: string | null;
  logoSmallUrl: string | null;
  address: ListPlaygrounds_tenants_address | null;
  email: string | null;
}

export interface ListPlaygrounds {
  tenants: ListPlaygrounds_tenants[];
}
