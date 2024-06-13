import { Component, ElementRef, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from '../../directives/button.directive';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonDirective],
  template: `
    <div [ngClass]="opened() ? openClasses : closedClasses" role="presentation">
      <div class="bg-black opacity-20 abosolute inset-0"></div>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-100 container h-5/6 border border-sky-400 overflow-hidden"
      >
        <button
          (click)="opened.set(false)"
          appButton
          color="secondary"
          class="absolute right-5 top-5 z-10"
          type="button"
        >
          X
        </button>
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class ModalComponent {
  opened = model(false);

  protected closedClasses = 'hidden';
  protected openClasses = 'fixed inset-0';

  constructor(private el: ElementRef) {
    // TODO
  }
}
