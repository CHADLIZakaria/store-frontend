import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css'],
  animations: [
    trigger('slideToggle', [
      state('closed', style({
        height: '0px',
        display: 'none',
        overflow: 'hidden'
      })),
      state('open', style({
        height: '*',
        overflow: 'hidden'
      })),
      transition('closed <=> open', [
        animate('0.3s ease-in-out')
      ])
    ])
  ]
})
export class DropDownComponent {
  isOpen:boolean = false;
  @Output() onClickElement = new EventEmitter<number>();
  @Input() title?: string;
  @Input() image?: string;
  @Input() elements?: string[];


  toggle() {
    this.isOpen = !this.isOpen
  }
  onClick(value: number) {
    this.onClickElement.emit(value)
  }
}
