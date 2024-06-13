import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-logon',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputDirective,
    FormFieldComponent,
  ],
  templateUrl: './logon.component.html',
})
export class LogonComponent {
  static readonly BOOKING_CODE_MIN_LENGTH = 5;
  static readonly BOOKING_CODE_MAX_LENGTH = 6;

  static readonly FAMILY_NAME_MIN_LENGTH = 2;
  static readonly FAMILY_NAME_MAX_LENGTH = 30;

  submissionError = false;

  private bookingService = inject(BookingService);
  private router = inject(Router);

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

  shouldDisplayErrorMessage(control: FormControl) {
    return control.invalid && (control.touched || control.dirty);
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('minlength')) {
      return `Make sure the booking code contains at least ${LogonComponent.BOOKING_CODE_MIN_LENGTH} characters`;
    }

    if (control.hasError('maxlength')) {
      return `Make sure the booking code contains maximum ${LogonComponent.BOOKING_CODE_MAX_LENGTH} characters`;
    }

    if (control.hasError('required')) {
      return 'Field is required';
    }

    return '';
  }

  async onSubmit() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity({ onlySelf: false, emitEvent: true });
    this.submissionError = false;

    if (this.form.invalid) {
      return;
    }

    const bookingCode = this.form.value.bookingCode ?? '';
    const familyName = this.form.value.familyName ?? '';

    try {
      await this.bookingService.findBooking(bookingCode, familyName);

      this.router.navigate(['booking-details']);
    } catch (err) {
      this.submissionError = true;
    }
  }
}
