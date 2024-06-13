import { Component, inject } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  LowerCasePipe,
  TitleCasePipe,
} from '@angular/common';
import { Router } from '@angular/router';
import { Duration } from 'luxon';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Booking, ITINERARY_TYPE } from '@/graphql';
import { BookingService } from '../../core/services/booking.service';
import { ButtonDirective } from '../../shared/directives/button.directive';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    LowerCasePipe,
    TitleCasePipe,
    ButtonDirective,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  private router = inject(Router);
  private bookingService = inject(BookingService);

  booking!: Booking;

  get originCity() {
    return this.booking.itinerary.connections[0].origin.city;
  }

  get destinationCity() {
    return this.booking.itinerary.connections[0].destination.city;
  }

  get itineraryType() {
    if (this.booking.itinerary.type === ITINERARY_TYPE.ROUND_TRIP) {
      return '<->';
    }

    return '->';
  }

  get itineraryDate() {
    return this.booking.itinerary.connections[0].segments[0].marketingFlight
      .operatingFlight.localCheckInStart;
  }

  get passengers() {
    return [this.booking.passengers];
  }

  get contactDetails() {
    return this.booking.contactDetails
      .map((contactDetail) => {
        if (!('__typename' in contactDetail)) {
          return { type: 'EmailAddress', value: contactDetail.address };
        }

        switch (contactDetail.__typename) {
          case 'EmailAddress': {
            return { type: 'EmailAddress', value: contactDetail.address };
          }
          default:
            return null;
        }
      })
      .filter(Boolean) as { type: string; value: string }[];
  }

  getItineraryStartTime(connectionId: number) {
    const connection = this.booking.itinerary.connections.find(
      (c) => c.id === connectionId
    );

    if (!connection) {
      return '';
    }

    return connection.segments[0].marketingFlight.operatingFlight
      .localScheduledDeparture;
  }

  getItineraryEndTime(connectionId: number) {
    const connection = this.booking.itinerary.connections.find(
      (c) => c.id === connectionId
    );

    if (!connection) {
      return '';
    }

    return connection.segments[connection.segments.length - 1].marketingFlight
      .operatingFlight.localScheduledArrival;
  }

  getItineraryDuration(connectionId: number) {
    const connection = this.booking.itinerary.connections.find(
      (c) => c.id === connectionId
    );

    if (!connection) {
      return '';
    }

    const duration = connection.segments.reduce((d, segment) => {
      return d.plus(
        Duration.fromISO(segment.marketingFlight.operatingFlight.duration)
      );
    }, Duration.fromMillis(0));

    const hours = duration.hours ? `${duration.hours}h` : '';
    const minutes = duration.minutes ? `${duration.minutes}m` : '';

    return [hours, minutes].filter(Boolean).join(' ');
  }

  getStopsCount(connectionId: number) {
    const connection = this.booking.itinerary.connections.find(
      (c) => c.id === connectionId
    );

    if (!connection) {
      return '';
    }

    const segmentCount = connection.segments.length;

    if (!segmentCount) {
      return '';
    }

    if (segmentCount === 1) {
      return 'Direct';
    }

    return `${segmentCount} stops`;
  }

  constructor() {
    this.booking = this.bookingService.booking as Booking;
  }

  navigateBackToSearch() {
    this.router.navigate(['']);
  }
}
