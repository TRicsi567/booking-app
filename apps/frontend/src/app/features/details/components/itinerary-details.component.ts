import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { Component, LOCALE_ID, inject } from '@angular/core';
import { ItineraryService } from '../services/itinerary.service';
import {
  DataPairComponent,
  DataPairTitleComponent,
  DataPairValueComponent,
} from '../../../shared/components/data-pair/data-pair.component';
import { Duration } from 'luxon';

@Component({
  selector: 'app-itinerary-details',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    DataPairComponent,
    DataPairTitleComponent,
    DataPairValueComponent,
  ],
  host: {
    class: 'overflow-auto block h-full',
  },
  template: `
    <div class="m-12">
      <h1>Itinerary details</h1>

      <div class="mt-10 space-y-10">
        <section>
          <h2>Connection info</h2>
          <hr />

          <div class="flex flex-col mt-8 space-y-4">
            @for(info of connectionInfos; track info.title) {
            <app-data-pair>
              <app-data-pair-title>{{ info.title }}</app-data-pair-title>
              <app-data-pair-value>{{ info.value }}</app-data-pair-value>
            </app-data-pair>
            }
          </div>
        </section>

        <section>
          <h2>Departure info</h2>
          <hr />
          <div class="flex flex-col mt-8 space-y-4">
            @for(info of departureInfos; track info.title) {
            <app-data-pair>
              <app-data-pair-title>{{ info.title }}</app-data-pair-title>
              <app-data-pair-value>{{ info.value }}</app-data-pair-value>
            </app-data-pair>
            }
          </div>
        </section>

        <section>
          <h2>Arrival info</h2>
          <hr />
          <div class="flex flex-col mt-8 space-y-4">
            @for(info of arrivalInfos; track info.title) {
            <app-data-pair>
              <app-data-pair-title>{{ info.title }}</app-data-pair-title>
              <app-data-pair-value>{{ info.value }}</app-data-pair-value>
            </app-data-pair>
            }
          </div>
        </section>
      </div>
    </div>
  `,
})
export class ItineraryDetailsComponent {
  itineraryService = inject(ItineraryService);
  localeId = inject(LOCALE_ID);

  connectionInfos = [
    {
      title: 'Carrier',
      value: this.itineraryService.marketingFlight.carrier.name,
    },
    {
      title: 'Flight number',
      value: this.itineraryService.operatingFlight.number,
    },
    {
      title: 'Cabin',
      value: this.itineraryService.operatingFlight.cabin.name,
    },
    {
      title: 'Aircraft',
      value: this.itineraryService.operatingFlight.equipment.name,
    },
    {
      title: 'Flight duration',
      value: Duration.fromISO(
        this.itineraryService.operatingFlight.duration
      ).toFormat("h'h' m'm'"),
    },
  ];

  departureInfos = [
    {
      title: 'Airport',
      value: `${this.itineraryService.connection.origin.name} - ${this.itineraryService.connection.origin.IATACode}`,
    },
    {
      title: 'Check-in start',
      value: formatDate(
        this.itineraryService.operatingFlight.localCheckInStart,
        'shortTime',
        this.localeId
      ),
    },
    {
      title: 'Check-in end',
      value: formatDate(
        this.itineraryService.operatingFlight.localCheckInEnd,
        'shortTime',
        this.localeId
      ),
    },
    {
      title: 'Scheduled departure',
      value: formatDate(
        this.itineraryService.operatingFlight.localScheduledDeparture,
        'shortTime',
        this.localeId
      ),
    },
  ];

  arrivalInfos = [
    {
      title: 'Airport',
      value: `${this.itineraryService.connection.destination.name} - ${this.itineraryService.connection.destination.IATACode}`,
    },
    {
      title: 'Scheduled arrival',
      value: formatDate(
        this.itineraryService.operatingFlight.localScheduledArrival,
        'shortTime',
        this.localeId
      ),
    },
    {
      title: 'Terminal',
      value: this.itineraryService.operatingFlight.arrivalTerminal.name,
    },
  ];
}
