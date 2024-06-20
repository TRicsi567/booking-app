import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { map } from 'rxjs';

export const hasBookingGuard: CanActivateFn = () => {
  const bookingService = inject(BookingService);
  const router = inject(Router);

  // if (!bookingService.booking) {
  //   router.navigate([''], { replaceUrl: true });
  //   return false;
  // }

  return bookingService.booking$.pipe(
    map((booking) => {
      if (booking) {
        return true;
      }

      return new RedirectCommand(router.parseUrl(''), {
        skipLocationChange: true,
      });
    })
  );
};
