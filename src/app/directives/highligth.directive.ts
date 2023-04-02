import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[highligth]',
})
export class HighligthDirective {
  public defaultColor = 'gray';
  @Input('highligth') set bgColor(bgColor: string) {
    this.element.nativeElement.style.backgroundColor =
      bgColor || this.defaultColor;
  }

  constructor(private element: ElementRef) {
    this.element.nativeElement.style.backgroundColor = this.defaultColor;
  }
}
