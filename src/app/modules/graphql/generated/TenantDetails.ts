/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TenantDetails
// ====================================================

export interface TenantDetails_tenant_address {
  __typename: "TenantAddress";
  city: string | null;
}

export interface TenantDetails_tenant {
  __typename: "Tenant";
  id: string;
  name: string | null;
  description: string | null;
  logoSmallUrl: string | null;
  address: TenantDetails_tenant_address | null;
  email: string | null;
  enableOnlineRegistration: boolean;
  enableOnlineEnrollment: boolean;
}

export interface TenantDetails {
  tenant: TenantDetails_tenant | null;
}

export interface TenantDetailsVariables {
  tenantId: string;
}
