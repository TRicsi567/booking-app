import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Renderer2,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelDirective } from '../../directives/label.directive';
import { InputDirective } from '../../directives/input.directive';
import { FormControlName } from '@angular/forms';
import { FieldErrorComponent } from './field-error.component';
import { Observable, map } from 'rxjs';

let uniqueId = 1;

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content [attr.for]="almafa" select="[appLabel]"></ng-content>
    <ng-content select="[appInput]"></ng-content>
    <ng-content select="app-field-error"></ng-content>
  `,
})
export class FormFieldComponent implements AfterContentInit {
  renderer = inject(Renderer2);
  viewContainerRef = inject(ViewContainerRef);

  @HostBinding('class') className = ['inline-flex', 'flex-col'].join(' ');

  @ContentChild(LabelDirective, { static: true, read: ElementRef })
  labelElementRef!: ElementRef;

  @ContentChild(InputDirective, { static: true, read: ElementRef })
  inputElementRef!: ElementRef;

  @ContentChild(FormControlName, { static: true })
  formControlName!: FormControlName;

  @ContentChild(FieldErrorComponent) fieldError!: FieldErrorComponent;

  private readonly controlId;

  constructor() {
    this.controlId = `app-form-field-${uniqueId}`;
    uniqueId++;
  }

  fieldError$: Observable<string> | null = null;

  ngAfterContentInit(): void {
    if (this.formControlName.statusChanges) {
      this.fieldError.error$ = this.formControlName.statusChanges.pipe(
        map((status) => {
          if (status !== 'INVALID') {
            return '';
          }

          const errorKeys = Object.keys(this.formControlName.errors || {});

          return errorKeys[0] || '';
        }),
      );
    }

    this.renderer.setAttribute(
      this.labelElementRef.nativeElement,
      'for',
      this.controlId,
    );

    this.renderer.setAttribute(
      this.inputElementRef.nativeElement,
      'id',
      this.controlId,
    );
  }
}
