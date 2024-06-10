import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsResolver } from './bookings.resolver';
import { ContactDetailResolver } from './contactDetail.resolver';

@Module({
  providers: [BookingsService, BookingsResolver, ContactDetailResolver],
})
export class BookingsModule {}
