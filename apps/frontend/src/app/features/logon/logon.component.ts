import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BookingService } from '../../core/services/booking.service';
import { InputDirective } from '../../shared/directives/input.directive';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import {
  Subject,
  catchError,
  map,
  of,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { LabelDirective } from '../../shared/directives/label.directive';
import { FieldErrorComponent } from '../../shared/components/form-field/field-error.component';

@Component({
  selector: 'app-logon',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputDirective,
    LabelDirective,
    FormFieldComponent,
    FieldErrorComponent,
  ],
  templateUrl: './logon.component.html',
})
export class LogonComponent implements OnInit, OnDestroy {
  static readonly BOOKING_CODE_MIN_LENGTH = 5;
  static readonly BOOKING_CODE_MAX_LENGTH = 6;

  static readonly FAMILY_NAME_MIN_LENGTH = 2;
  static readonly FAMILY_NAME_MAX_LENGTH = 30;

  get bookingCodeMinLength() {
    return LogonComponent.BOOKING_CODE_MIN_LENGTH;
  }

  get bookingCodeMaxLength() {
    return LogonComponent.BOOKING_CODE_MAX_LENGTH;
  }

  get familyNameMinLength() {
    return LogonComponent.FAMILY_NAME_MIN_LENGTH;
  }

  get familyNameMaxLength() {
    return LogonComponent.FAMILY_NAME_MAX_LENGTH;
  }

  private bookingService = inject(BookingService);
  private router = inject(Router);

  formState: 'idle' | 'pending' | 'error' = 'idle';

  private readonly destory$ = new Subject<boolean>();

  private bookingSource = new Subject<{
    bookingCode: string;
    familyName: string;
  }>();

  readonly booking$ = this.bookingSource.pipe(
    takeUntil(this.destory$),
    switchMap(({ bookingCode, familyName }) => {
      return this.bookingService.findBooking$(bookingCode, familyName).pipe(
        map((response) => ({
          data: response.data,
          error: null,
        })),
        tap(({ data }) => {
          this.bookingService.booking$.next(data.booking);
          this.router.navigate(['booking-details']);
        }),
        catchError((err) => {
          return of({ data: null, error: err.message });
        }),
      );
    }),
    shareReplay(1),
  );

  ngOnInit(): void {
    this.booking$.subscribe();
  }

  ngOnDestroy(): void {
    this.destory$.next(true);
  }

  form = new FormGroup({
    bookingCode: new FormControl('', {
      updateOn: 'blur',
      validators: [
        Validators.required,
        Validators.minLength(LogonComponent.BOOKING_CODE_MIN_LENGTH),
        Validators.maxLength(LogonComponent.BOOKING_CODE_MAX_LENGTH),
        Validators.pattern('[a-zA-Z2-9]*'),
      ],
    }),
    familyName: new FormControl('', {
      updateOn: 'blur',
      validators: [
        Validators.required,
        Validators.minLength(LogonComponent.FAMILY_NAME_MIN_LENGTH),
        Validators.maxLength(LogonComponent.FAMILY_NAME_MAX_LENGTH),
      ],
    }),
  });

  async onSubmit() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity({ onlySelf: false, emitEvent: true });

    if (this.form.invalid) {
      return;
    }

    const bookingCode = this.form.value.bookingCode ?? '';
    const familyName = this.form.value.familyName ?? '';

    this.bookingSource.next({
      bookingCode,
      familyName,
    });
  }
}
