import { Resolver, Query, Args } from '@nestjs/graphql';
import { BookingsService } from './bookings.service';

@Resolver('Booking')
export class BookingsResolver {
  constructor(private readonly bookingsService: BookingsService) {}

  @Query('booking')
  async findOneByBookingCodeAndLastName(
    @Args('bookingCode')
    bookingCode: string,
    @Args('lastName')
    lastName: string
  ) {
    return this.bookingsService.findBooking(bookingCode, lastName);
  }
}
