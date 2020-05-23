/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TenantDetails
// ====================================================

export interface TenantDetails_tenant_address {
  readonly __typename: "TenantAddress";
  readonly city: string | null;
}

export interface TenantDetails_tenant {
  readonly __typename: "Tenant";
  readonly id: string;
  readonly name: string | null;
  readonly description: string | null;
  readonly logoSmallUrl: string | null;
  readonly address: TenantDetails_tenant_address | null;
  readonly email: string | null;
  readonly enableOnlineRegistration: boolean;
  readonly enableOnlineEnrollment: boolean;
}

export interface TenantDetails {
  readonly tenant: TenantDetails_tenant | null;
}

export interface TenantDetailsVariables {
  readonly tenantId: string;
}
