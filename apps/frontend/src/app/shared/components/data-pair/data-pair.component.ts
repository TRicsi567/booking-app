import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-data-pair-title',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
})
export class DataPairTitleComponent {}

@Component({
  selector: 'app-data-pair-value',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'font-bold',
  },
  template: ` <ng-content></ng-content> `,
})
export class DataPairValueComponent {}

@Component({
  selector: 'app-data-pair',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'inline-flex flex-col',
  },
  template: `
    <ng-content select="app-data-pair-title"></ng-content>
    <ng-content select="app-data-pair-value"></ng-content>
  `,
})
export class DataPairComponent {}
