import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  HostBinding,
  Input,
  TemplateRef,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-field-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (error$ | async; as fieldError) {
      @if (fieldError) {
        <ng-container
          *ngTemplateOutlet="
            fieldErrorTemplate;
            context: { $implicit: fieldError }
          "
        ></ng-container>
      }
    }
  `,
})
export class FieldErrorComponent {
  @HostBinding('class') className = 'text-red-600 font-medium';

  @ContentChild('fieldErrorTemplate') fieldErrorTemplate!: TemplateRef<unknown>;

  @Input() error$: null | Observable<string> = null;
}
