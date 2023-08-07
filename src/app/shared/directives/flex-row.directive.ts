import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFlexRow]'
})
export class FlexRowDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'flex-r');
  }
}
