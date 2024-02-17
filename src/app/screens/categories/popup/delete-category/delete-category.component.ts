import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent {

  @Input() id!: number;

  constructor(private categoryService: CategoryService) {}

  @Output() toggle = new EventEmitter<boolean>()

  close() {
    this.toggle.emit(false)
  }

  save() {
    this.categoryService.delete(this.id).subscribe({
      next: (data) => {
        this.toggle.emit(false)
      }
    })
  }
}
