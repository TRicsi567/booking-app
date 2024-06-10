
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum ITINERARY_TYPE {
    ONE_WAY = "ONE_WAY",
    ROUND_TRIP = "ROUND_TRIP"
}

export enum SEGMENT_TYPE {
    LOCAL = "LOCAL",
    INTERNATIONAL = "INTERNATIONAL"
}

export interface Flight {
    number: string;
    carrier: Translation;
}

export class EmailAddress {
    address: string;
}

export class Translation {
    code: string;
    name: string;
}

export class SellingClass {
    code: string;
}

export class Terminal {
    name: string;
}

export class Passenger {
    id: number;
    firstName: string;
    lastName: string;
    title: Translation;
}

export class City {
    IATACode: string;
    name?: Nullable<string>;
    country?: Nullable<Translation>;
}

export class Airport {
    IATACode: string;
    name: string;
    city: City;
}

export class OperatingFlight implements Flight {
    number: string;
    carrier: Translation;
    duration: string;
    flown: boolean;
    checkInStart: string;
    localCheckInStart: string;
    checkInEnd: string;
    localCheckInEnd: string;
    scheduledArrival: string;
    localScheduledArrival: string;
    scheduledDeparture: string;
    localScheduledDeparture: string;
    arrivalTerminal: Terminal;
    cabin: Translation;
    equipment: Translation;
}

export class MarketingFlight implements Flight {
    number: string;
    carrier: Translation;
    status: Translation;
    numberOfStops: number;
    sellingClass: SellingClass;
    operatingFlight: OperatingFlight;
}

export class Segment {
    id: number;
    type: SEGMENT_TYPE;
    informational: boolean;
    departFrom: Airport;
    arriveOn: Airport;
    marketingFlight: MarketingFlight;
}

export class Connection {
    id: number;
    duration: string;
    origin: Airport;
    destination: Airport;
    segments?: Nullable<Nullable<Segment>[]>;
}

export class Itinerary {
    type: ITINERARY_TYPE;
    connections: Connection[];
}

export class Booking {
    bookingCode: string;
    contactDetails: ContactDetail[];
    itinerary: Itinerary;
    passengers: Passenger;
}

export abstract class IQuery {
    abstract booking(bookingCode: string, lastName: string): Booking | Promise<Booking>;
}

export type ContactDetail = EmailAddress;
type Nullable<T> = T | null;
