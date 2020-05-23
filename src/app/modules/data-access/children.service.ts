import { Injectable } from '@angular/core';
import { DataAccessModule } from './data-access.module';
import { Observable, of } from 'rxjs';
import { Child } from '@hoepel.app/types';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {
  ChildrenManagedByMe,
  ChildrenManagedByMeVariables,
  ChildrenManagedByMe_parentPlatform_childrenManagedByMe
} from '../graphql/generated/ChildrenManagedByMe';
import { RegisterChildInPlayground, RegisterChildInPlaygroundVariables } from '../graphql/generated/RegisterChildInPlayground';
import { ChildManagedByParentInput } from '../graphql/generated/globalTypes';

export type ManagedChild = ChildrenManagedByMe_parentPlatform_childrenManagedByMe;

@Injectable({providedIn: DataAccessModule})
export class ChildrenService {
  constructor(
    private apollo: Apollo,
  ) {}

  /** Get children managed by the current user belonging to the organisation with the given id */
  getChildrenForPlayground(organisationId: string): Observable<readonly ManagedChild[]> {
    return this.apollo.query<ChildrenManagedByMe, ChildrenManagedByMeVariables>({
      query: gql`query ChildrenManagedByMe($organisationId:ID!) {
        parentPlatform(organisationId:$organisationId) {
          childrenManagedByMe {
            id
            firstName
            lastName
          }
        }
      }`,
      variables: { organisationId },
      fetchPolicy: 'network-only'
    }).pipe(map(res => res.data.parentPlatform.childrenManagedByMe));
  }

  registerChildInPlayground(organisationId: string, child: Child): Observable<void> {
    const newChild: ChildManagedByParentInput = {
      address: child.address,
      email: child.email,
      firstName: child.firstName,
      lastName: child.lastName,
      phone: child.phone,
      remarks: child.remarks,
      birthDate: child.birthDate?.toISO8601(),
      gender: child.gender,
      uitpasNumber: child.uitpasNumber,
    };

    return this.apollo.mutate<RegisterChildInPlayground, RegisterChildInPlaygroundVariables>({
      mutation: gql`mutation RegisterChildInPlayground($organisationId:ID!, $newChild:ChildManagedByParentInput!) {
        registerChildFromParentPlatform(organisationId:$organisationId, newChild:$newChild)
      }`,
      variables: { organisationId, newChild }
    }).pipe(map(_ => {}));
  }
}
