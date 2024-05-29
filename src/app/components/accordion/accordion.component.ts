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
  @Input("items") items: { title: string; content: string[]; values: string[], count: string[]}={title: '', content: [], values: [], count: []};
  @Input("type") type!: string;
  @Input("filter") filter!: string;
  @Output("checked") checkedEvent = new EventEmitter<{filter: string, key: string, value: boolean}>();
  @Input("reset") reset!: any;

  isOpen: boolean = true;
  diplayContent:  string[] = []
  isShowAll = false;
  selected: string=''

  checkedElement: string[]=[]
  
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

  resetFilters() {
    this.checkedElement.splice(0, this.checkedElement.length)
    console.log(this.checkedElement)
    this.checkedEvent.emit({filter: 'price', key: '', value: false})
    this.checkedEvent.emit({filter: 'category', key: '', value: false})
  }

  
  fieldsChange(value: any) {
    if(this.type==='checkbox') {
      if(value.currentTarget.checked) {
        this.checkedElement.push(value.currentTarget.value)
      }
      else {
        const index = this.checkedElement.indexOf(value.currentTarget.value);
        if (index > -1) {
          this.checkedElement.splice(index, 1);
        }
      }
    }
    else if(this.type==='radio') {
      this.checkedElement = []
      if(value.currentTarget.checked) {
        this.checkedElement.push(value.currentTarget.value.toString())
      }      
    }
    this.checkedEvent.emit({
      filter: this.filter,
      key: value.currentTarget.value.toString(),
      value: value.currentTarget.checked,      
    })
  }

  isChecked(index: string) {
    console.log(this.checkedElement)
    console.log(this.checkedElement.includes(index.toString()))
    return this.checkedElement.includes(index.toString())
  }

 
}