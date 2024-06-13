import { Resolver, Query, Args } from '@nestjs/graphql';
import { BookingsService } from './bookings.service';
import { GraphQLError } from 'graphql';

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
    const booking = this.bookingsService.findBooking(bookingCode, lastName);

    if (!booking) {
      throw new GraphQLError(
        `Booking with code: ${bookingCode} for passanger ${lastName} not found`,
        {
          extensions: {
            code: 'NOT_FOUND',
          },
        }
      );
    }

    return booking;
  }
}
