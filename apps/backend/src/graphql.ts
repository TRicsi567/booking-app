
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

export interface EmailAddress {
    address: string;
}

export interface Translation {
    code: string;
    name: string;
}

export interface SellingClass {
    code: string;
}

export interface Terminal {
    name: string;
}

export interface Passenger {
    id: number;
    firstName: string;
    lastName: string;
    title: Translation;
}

export interface City {
    IATACode: string;
    name?: Nullable<string>;
    country?: Nullable<Translation>;
}

export interface Airport {
    IATACode: string;
    name: string;
    city: City;
}

export interface OperatingFlight extends Flight {
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

export interface MarketingFlight extends Flight {
    number: string;
    carrier: Translation;
    status: Translation;
    numberOfStops: number;
    sellingClass: SellingClass;
    operatingFlight: OperatingFlight;
}

export interface Segment {
    id: number;
    type: SEGMENT_TYPE;
    informational: boolean;
    departFrom: Airport;
    arriveOn: Airport;
    marketingFlight: MarketingFlight;
}

export interface Connection {
    id: number;
    duration: string;
    origin: Airport;
    destination: Airport;
    segments: Segment[];
}

export interface Itinerary {
    type: ITINERARY_TYPE;
    connections: Connection[];
}

export interface Booking {
    bookingCode: string;
    contactDetails: ContactDetail[];
    itinerary: Itinerary;
    passengers: Passenger;
}

export interface IQuery {
    booking(bookingCode: string, lastName: string): Booking | Promise<Booking>;
}

export type ContactDetail = EmailAddress;
type Nullable<T> = T | null;
