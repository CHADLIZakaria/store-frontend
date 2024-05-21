import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger("sidebar", [
      state("close", style({
        transform: 'translateX(-100%)',
        opacity: 0,
      })),
      state("open", style({
        transform: 'translateX(0%)',
        opacity: 1
      })),
      transition("close <=> open", [       
        animate('700ms ease-in-out')
      ])
    ])
  ]
})
export class SidebarComponent {
  @Input() toggleSidebar: boolean = false;
}
