/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChildrenManagedByMe
// ====================================================

export interface ChildrenManagedByMe_parentPlatform_childrenManagedByMe {
  readonly __typename: "ChildManagedByParent";
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly onRegistrationWaitingList: boolean;
}

export interface ChildrenManagedByMe_parentPlatform {
  readonly __typename: "ParentPlatform";
  readonly childrenManagedByMe: ReadonlyArray<ChildrenManagedByMe_parentPlatform_childrenManagedByMe>;
}

export interface ChildrenManagedByMe {
  readonly parentPlatform: ChildrenManagedByMe_parentPlatform;
}

export interface ChildrenManagedByMeVariables {
  readonly organisationId: string;
}
