import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
})
export class FormFieldComponent {
  @Input()
  label = '';

  @Input()
  errorMessage = '';

  @Input()
  hintText = '';

  constructor() {
    // TODO
  }
}
