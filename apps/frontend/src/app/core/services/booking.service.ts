import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Booking } from '@/graphql';

const GET_BOOKING = gql`
  query GetBooking($bookingCode: String!, $lastName: String!) {
    booking(bookingCode: $bookingCode, lastName: $lastName) {
      bookingCode
      contactDetails {
        __typename
        ... on EmailAddress {
          address
        }
      }
      itinerary {
        type
        connections {
          id
          duration
          origin {
            IATACode
            name
            city {
              IATACode
              name
              country {
                code
                name
              }
            }
          }
          destination {
            IATACode
            name
            city {
              IATACode
              name
              country {
                code
                name
              }
            }
          }
          segments {
            id
            type
            informational
            departFrom {
              IATACode
              name
              city {
                IATACode
                name
                country {
                  code
                  name
                }
              }
            }
            arriveOn {
              IATACode
              name
              city {
                IATACode
                name
                country {
                  code
                  name
                }
              }
            }
            marketingFlight {
              number
              carrier {
                code
                name
              }
              status {
                code
                name
              }
              numberOfStops
              sellingClass {
                code
              }
              operatingFlight {
                number
                carrier {
                  code
                  name
                }
                duration
                flown
                checkInStart
                localCheckInStart
                checkInEnd
                localCheckInEnd
                scheduledArrival
                localScheduledArrival
                localScheduledDeparture
                arrivalTerminal {
                  name
                }
                cabin {
                  code
                  name
                }
                equipment {
                  code
                  name
                }
              }
            }
          }
        }
      }
      passengers {
        id
        firstName
        lastName

        title {
          code
          name
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  booking: null | Booking = null;

  constructor(private readonly apollo: Apollo) {}

  async findBooking(bookingCode: string, lastName: string) {
    const { data, error } = await this.apollo
      .watchQuery<{ booking: Booking }>({
        query: GET_BOOKING,
        variables: { bookingCode, lastName },
      })
      .result();

    if (error) {
      throw error;
    }

    this.booking = data.booking;

    return data;
  }
}
