import { Injectable } from '@angular/core';
import { DataAccessModule } from './data-access.module';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { ListPlaygrounds, ListPlaygrounds_tenants } from '../graphql/generated/ListPlaygrounds';
import { TenantDetails, TenantDetailsVariables } from '../graphql/generated/TenantDetails';

export type Playground = ListPlaygrounds_tenants;

@Injectable({providedIn: DataAccessModule})
export class PlaygroundsService {

  constructor(
    private apollo: Apollo,
  ) {}

  listPlaygrounds(): Observable<readonly Playground[]> {
    return this.apollo.query<ListPlaygrounds>({
      query: gql`query ListPlaygrounds {
        tenants {
          id
          name
          description
          logoSmallUrl
          address {
            city
          }
          email
          enableOnlineRegistration
          enableOnlineEnrollment
        }
      }`
    }).pipe(map(res => res.data.tenants.filter(tenant => tenant.enableOnlineRegistration)));
  }

  details(tenantId: string): Observable<Playground | null> {
    return this.apollo.query<TenantDetails, TenantDetailsVariables>({
      variables: {
        tenantId,
      },
      query: gql`
      query TenantDetails($tenantId:ID!) {
        tenant(id:$tenantId) {
          id
          name
          description
          logoSmallUrl
          address {
            city
          }
          email
          enableOnlineRegistration
          enableOnlineEnrollment
        }
      }`
    }).pipe(map(res => res.data.tenant));
  }
}
