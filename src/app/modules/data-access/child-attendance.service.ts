import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataAccessModule } from './data-access.module';
import gql from 'graphql-tag';
import {
  PossibleAttendancesForChildVariables,
  PossibleAttendancesForChild,
} from '../graphql/generated/PossibleAttendancesForChild';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RegisterChildAttendanceIntention, RegisterChildAttendanceIntentionVariables } from '../graphql/generated/RegisterChildAttendanceIntention';
import { UnregisterChildAttendanceIntentionVariables, UnregisterChildAttendanceIntention } from '../graphql/generated/UnregisterChildAttendanceIntention';

export { PossibleAttendancesForChild };

@Injectable({ providedIn: DataAccessModule })
export class ChildAttendanceService {
  constructor(private apollo: Apollo) {}

  possibleAttendancesForChild(
    organisationId: string,
    childId: string,
    year = new Date().getFullYear()
  ): Observable<PossibleAttendancesForChild> {
    return this.apollo.query<
      PossibleAttendancesForChild,
      PossibleAttendancesForChildVariables
    >({
      query: gql`
        query PossibleAttendancesForChild($organisationId: ID!, $childId: ID!, $year: Int!) {
          parentPlatform(organisationId: $organisationId) {
            shiftsAvailable(year: $year) {
              weekNumber
              weekDescription
              year

              possibleBubbles {
                name
                spotsLeft
                totalSpots
              }

              attendanceIntentionsForChild(childId: $childId) {
                childId
                status
                preferredBubbleName
                shifts {
                  id
                }
              }

              days {
                day
                dayFormatted

                shifts {
                  id
                  description
                  location
                  start
                  end
                  durationFormatted
                  kind
                  price
                }
              }
            }
          }
        }
      `,
      variables: { organisationId, year, childId },
      fetchPolicy: 'network-only',
    }).pipe(map(res => res.data));
  }

  registerAttendanceIntention(
    organisationId: string,
    childId: string,
    year: number,
    weekNumber: number,
    preferredBubbleName: string | null,
    shiftIds: readonly string[]
  ) {
    return this.apollo.mutate<RegisterChildAttendanceIntention, RegisterChildAttendanceIntentionVariables>({
      mutation: gql`
        mutation  RegisterChildAttendanceIntention(
          $organisationId: ID!
          $childId: ID!
          $preferredBubbleName: String
          $weekNumber: Int!
          $year: Int!
          $shifts: [ID!]!
        ) {
          registerChildAttendanceIntentionFromParentPlatform(
          organisationId: $organisationId
          childId: $childId
          preferredBubbleName: $preferredBubbleName
          weekNumber: $weekNumber
          year: $year
          shifts: $shifts
        )
      }`,
      variables: {
        childId,
        organisationId,
        shifts: shiftIds,
        weekNumber,
        year,
        preferredBubbleName
      }
    });
  }

  unregisterAttendanceIntention(
    organisationId: string,
    childId: string,
    year: number,
    weekNumber: number
  ) {
    return this.apollo.mutate<UnregisterChildAttendanceIntention, UnregisterChildAttendanceIntentionVariables>({
      mutation: gql`
        mutation UnregisterChildAttendanceIntention(
          $organisationId: ID!
          $childId: ID!
          $weekNumber: Int!
          $year: Int!
        ) {
          unregisterPendingChildAttendanceIntentionFromParentPlatform(
          organisationId: $organisationId
          childId: $childId
          weekNumber: $weekNumber
          year: $year
        )

      }`,
      variables: {
        childId,
        organisationId,
        weekNumber,
        year
      }
    });
  }
}
