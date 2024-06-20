import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'input[appInput]',
  standalone: true,
})
export class InputDirective {
  @HostBinding('class') className =
    'outline-none border-2 border-slate-600 w-full px-3 py-2.5';
}
