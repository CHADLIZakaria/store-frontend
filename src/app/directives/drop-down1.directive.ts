import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';

@Directive({
  selector: '[appDropDown1]',
  exportAs: 'appDropDown1'
})
export class DropDown1Directive {
  @HostBinding('class.open') isOpen = false;

  constructor(private elementRef: ElementRef, private router: Router) {
  }


  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isOpen = false
    }
    else {
      this.isOpen=true
    }
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }
}
