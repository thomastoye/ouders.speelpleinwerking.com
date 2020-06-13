/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ChildManagedByParentInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: RegisterChildInPlayground
// ====================================================

export interface RegisterChildInPlayground {
  readonly registerChildFromParentPlatform: string | null;
}

export interface RegisterChildInPlaygroundVariables {
  readonly organisationId: string;
  readonly newChild: ChildManagedByParentInput;
}
