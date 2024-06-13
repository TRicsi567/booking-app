import { Route } from '@angular/router';
import { LogonComponent } from './features/logon/logon.component';
import { DetailsComponent } from './features/details/details.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { hasBookingGuard } from './core/guards/has-booking.guard';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'find-booking', pathMatch: 'full' },
  { path: 'find-booking', component: LogonComponent },
  {
    path: 'booking-details',
    component: DetailsComponent,
    canActivate: [hasBookingGuard],
  },
  { path: '**', component: NotFoundComponent },
];
