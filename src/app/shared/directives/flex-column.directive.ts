import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFlexColumn]'
})
export class FlexColumnDirective implements OnInit {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'flex-c');
  }

}
