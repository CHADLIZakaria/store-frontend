import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {
  @HostBinding('class.fileover') fileover!: boolean;
  @Output() fileDropped = new EventEmitter<any>(); 

  constructor() { }

  @HostListener('dragover', ['$event']) onDragOver(evt: any) {
    evt.preventDefault()
    evt.stopPropagation()
    console.log('drag over')
    this.fileover = true
  }

  @HostListener('dragleave', ['$event']) ondragleave(evt: any) {
    evt.preventDefault()
    evt.stopPropagation()
    console.log('drag leave')
  }

  @HostListener('drop', ['$event']) onDrop(evt: any) {
    evt.preventDefault()
    evt.stopPropagation()
    this.fileover = false
    const files = evt.dataTransfer.files
    if(files.length > 0) {
      this.fileDropped.emit(files[0])
      console.log('you dropped '+files.length+' files')
    }

  }
}
