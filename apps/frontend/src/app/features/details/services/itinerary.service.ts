import { Injectable } from '@angular/core';
import { BookingService } from '../../../core/services/booking.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Booking } from '@/graphql';

@Injectable()
export class ItineraryService {
  booking!: Booking;

  constructor(private bookingService: BookingService) {
    const { booking } = this.bookingService;

    if (!booking) {
      throw new Error('Assertion error: booking must exist');
    }

    this.booking = booking;
  }

  get connection() {
    return this.booking.itinerary.connections[0];
  }

  get marketingFlight() {
    return this.connection.segments[0].marketingFlight;
  }

  get operatingFlight() {
    return this.marketingFlight.operatingFlight;
  }
}
