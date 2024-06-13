import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';

const classList = {
  primary: 'bg-rose-600 hover:bg-rose-700 text-rose-50 px-4 py-2',
  secondary: 'bg-sky-600 hover:bg-sky-700 text-sky-50 px-4 py-2',
};

@Directive({
  selector: '[appButton]',
  standalone: true,
})
export class ButtonDirective implements OnInit {
  private element = inject(ElementRef);
  private renderer = inject(Renderer2);

  @Input()
  color: 'primary' | 'secondary' = 'primary';

  ngOnInit(): void {
    const nativeElement = this.element.nativeElement as HTMLElement;

    this.renderer.setAttribute(
      this.element.nativeElement,
      'class',
      [nativeElement.className, classList[this.color]].filter(Boolean).join(' ')
    );
  }
}
