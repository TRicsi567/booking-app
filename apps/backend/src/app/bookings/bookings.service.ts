import { Injectable } from '@nestjs/common';

import { join } from 'path';
import { readFileSync } from 'fs';

import { Booking } from '../../graphql';

@Injectable()
export class BookingsService {
  private bookings: Booking[];

  constructor() {
    const fileName = join(__dirname, 'assets/__fixtures__/booking.json');

    try {
      const mockBookingRaw = readFileSync(fileName, { encoding: 'utf8' });

      const mockBooking = JSON.parse(mockBookingRaw) as Booking;

      this.bookings = [mockBooking];
    } catch (err) {
      console.error(`Could not read file contents of ${fileName}\n ${err}`);

      this.bookings = [];
    }
  }

  findBooking(bookingCode: string, lastName: string) {
    const booking = this.bookings.find(
      (booking) =>
        booking.bookingCode === bookingCode &&
        booking.passengers.lastName === lastName
    );

    return booking ?? null;
  }
}
