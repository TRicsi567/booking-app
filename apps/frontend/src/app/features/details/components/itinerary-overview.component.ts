import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Duration } from 'luxon';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Connection } from '@/graphql';

@Component({
  selector: 'app-itinerary-overview',
  standalone: true,
  imports: [CommonModule, DatePipe],
  host: {
    class: 'block',
  },
  template: `
    <div>
      {{ getItineraryStartTime() | date : 'mediumDate' }}
    </div>
    <div class="flex items-center justify-between">
      <span class="font-medium">
        {{ connection.origin.IATACode }}
      </span>
      <span class="grow border border-slate-200 mx-4"></span>
      <span class="px-2 py-1 bg-slate-200 rounded-full font-medium">{{
        getStopsCount()
      }}</span>
      <span class="grow border border-slate-200 mx-4"></span>
      <span class="font-medium">
        {{ connection.destination.IATACode }}
      </span>
    </div>
    <div class="flex items-center justify-between">
      <span class="font-bold">
        {{ getItineraryStartTime() | date : 'shortTime' }}
      </span>
      <span class="font-medium">{{ getItineraryDuration() }}</span>
      <span class="font-bold">
        {{ getItineraryEndTime() | date : 'shortTime' }}
      </span>
    </div>
  `,
})
export class ItineraryOverviewComponent {
  @Input({ required: true })
  public connection!: Connection;

  getItineraryStartTime() {
    return this.connection.segments[0].marketingFlight.operatingFlight
      .localScheduledDeparture;
  }

  getItineraryEndTime() {
    return this.connection.segments[this.connection.segments.length - 1]
      .marketingFlight.operatingFlight.localScheduledArrival;
  }

  getItineraryDuration() {
    const duration = this.connection.segments.reduce((d, segment) => {
      return d.plus(
        Duration.fromISO(segment.marketingFlight.operatingFlight.duration)
      );
    }, Duration.fromMillis(0));

    const hours = duration.hours ? `${duration.hours}h` : '';
    const minutes = duration.minutes ? `${duration.minutes}m` : '';

    return [hours, minutes].filter(Boolean).join(' ');
  }

  getStopsCount() {
    const segmentCount = this.connection.segments.length;

    if (!segmentCount) {
      return '';
    }

    if (segmentCount === 1) {
      return 'Direct';
    }

    return `${segmentCount} stops`;
  }
}
