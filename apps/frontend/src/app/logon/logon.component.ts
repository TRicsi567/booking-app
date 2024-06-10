import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-logon',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './logon.component.html',
  styleUrl: './logon.component.css',
})
export class LogonComponent {
  form = new FormGroup({
    bookingCode: new FormControl(''),
    familyName: new FormControl(''),
  });

  handleSubmit() {
    console.log(this.form.value.bookingCode);
    console.log(this.form.value.familyName);

    this.form.reset({ bookingCode: '', familyName: '' });
  }
}
