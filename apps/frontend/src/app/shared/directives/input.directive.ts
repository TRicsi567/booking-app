import { Directive } from '@angular/core';

@Directive({
  selector: 'input[appInput]',
  standalone: true,
  host: {
    class: 'outline-none border-2 border-slate-600 w-full px-3 py-2.5',
  },
})
export class InputDirective {
  constructor() {
    // TODO
  }
}
