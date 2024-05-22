import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger("sidebar", [
      state("close", style({
        transform: 'translateX(-200%)',
        backgroundColor:'rgba(136,139,147,0.8)'
      })),
      state("open", style({
        transform: 'translateX(0%)',
        backgroundColor: 'rgba(136,139,147,0.8)'
      })),
      transition("close <=> open", [       
        animate('400ms ease-in-out')
      ])
    ])
  ]
})
export class SidebarComponent {
  @Input() statusSidebar!: boolean;
  @Output() closeSidebar = new EventEmitter<boolean>();

  onClose() {
    this.closeSidebar.emit(false)
  }

  

}
