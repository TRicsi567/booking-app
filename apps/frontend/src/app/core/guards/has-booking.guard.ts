import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BookingService } from '../services/booking.service';

export const hasBookingGuard: CanActivateFn = () => {
  const bookingService = inject(BookingService);
  const router = inject(Router);

  if (!bookingService.booking) {
    router.navigate([''], { replaceUrl: true });
    return false;
  }

  return true;
};
