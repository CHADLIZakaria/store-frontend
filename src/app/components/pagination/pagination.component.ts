import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styles: [`
    :host {
      flex: 1
    }
  `]
})
export class PaginationComponent {
  @Input() totalPages!: number;
  @Input() currentPage!: number;
  @Output() changePage = new EventEmitter<{type: string, value: number | null}>;
  onPaginate(page: number) {
    this.changePage.emit({type: "paginate", value: page})
  }
  onNext() {
    this.changePage.emit({type: "next", value: null})
  }
  onPrev() {
    this.changePage.emit({type: "prev", value: null})
  }
  createPaginateList(currentPage: number, numberPages: number): number[] {
    const maxShowPages: number=5
    let res: number[]=[]
    let start = Math.max(0, currentPage-2)
    let end = Math.min(numberPages, start+maxShowPages)
    if(end-start < maxShowPages) {
      start = Math.max(0, end-maxShowPages) 
    }
    for(let i=start; i<end;i++) {
      res.push(i)
    }
    return res;
  }
}
