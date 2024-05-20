import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  animations: [
    trigger('slideToggle', [
      state('closed', style({
        height: '0px',
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
export class AccordionComponent implements OnInit {
  @Input("items") items: { title: string; content: string[]; values: string[]}={title: '', content: [], values: [] };
  @Input("type") type!: string;
  @Input("filter") filter!: string;
  @Output("checked") checkedEvent = new EventEmitter<{filter: string, key: string, value: boolean}>();
  
  isOpen: boolean = false;
  diplayContent:  string[] = []
  isShowAll = false;
  
  ngOnInit(): void {
    this.getDisplayContent();
  }
 
  getDisplayContent() {
    if (this.isShowAll || this.items.content.length <= 5) {
      this.diplayContent = this.items.content;
    } else {
      this.diplayContent = this.items.content.slice(0, 5);
    }
  }

  toggle() {
   this.isOpen = !this.isOpen
   if(!this.isOpen) {
    this.isShowAll = false
    this.getDisplayContent()
   }
  }

  toggleShowMore() {
    this.isShowAll = !this.isShowAll
    this.getDisplayContent()
  }

  fieldsChange(value: any) {
    this.checkedEvent.emit({
      filter: this.filter,
      key: value.currentTarget.value.toString(),
      value: value.currentTarget.checked,      
    })
  }

 
}