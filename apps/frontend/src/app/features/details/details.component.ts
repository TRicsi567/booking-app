import { Component, inject, signal } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  LowerCasePipe,
  TitleCasePipe,
} from '@angular/common';
import { Router } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Booking, ITINERARY_TYPE } from '@/graphql';
import { ItineraryDetailsComponent } from './components/itinerary-details.component';
import { ItineraryOverviewComponent } from './components/itinerary-overview.component';
import { ItineraryService } from './services/itinerary.service';
import { BookingService } from '../../core/services/booking.service';
import { ButtonDirective } from '../../shared/directives/button.directive';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import {
  DataPairComponent,
  DataPairTitleComponent,
  DataPairValueComponent,
} from '../../shared/components/data-pair/data-pair.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    LowerCasePipe,
    TitleCasePipe,
    ButtonDirective,
    ItineraryOverviewComponent,
    ItineraryDetailsComponent,
    ModalComponent,
    DataPairValueComponent,
    DataPairComponent,
    DataPairTitleComponent,
  ],
  providers: [ItineraryService],
  templateUrl: './details.component.html',
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
            return {
              type: 'EmailAddress',
              title: 'Email',
              value: contactDetail.address,
            };
          }
          default:
            return null;
        }
      })
      .filter(Boolean) as { type: string; title: string; value: string }[];
  }

  constructor() {
    this.booking = this.bookingService.booking as Booking;
  }

  detailsModalOpen = signal(false);

  navigateBackToSearch() {
    this.router.navigate(['']);
  }
}
