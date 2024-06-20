import { gql } from 'apollo-angular';

export interface Connection {
  id: number;
}

export enum ITINERARY_TYPE {
  ONE_WAY,
  ROUND_TRIP,
}
export interface Itinerary {
  type: ITINERARY_TYPE;
}

export interface EmailAddress {
  address: string;
  connections: Connection[];
}

export type ContactDetail = EmailAddress & { __typename: string };

export interface Booking {
  bookingCode: string;
  contactDetails: ContactDetail[];
}

export const GET_BOOKING = gql`
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
