import { Component, OnInit } from '@angular/core';
import { category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories!: category[];
  showPopupCategory: boolean=false;
  showPopupDeleteCategory: boolean = false

  constructor(private categoryService: CategoryService) {

  }

  ngOnInit(): void {

    this.categoryService.categoriesChanged.subscribe(
      (categories: category[]) => {
        this.categories = categories
      }
    )

    this.categoryService.findAll().subscribe({
      next:(data) => {
        this.categories = data
        console.log(data)
      }
    })

  }

  delete(id: number) {
    this.categoryService.delete(id).subscribe()
  }

  
  
  onToggle($event: boolean) {
    this.showPopupCategory = $event
  }

  onTogglePopupDeleteCategory($event: boolean) {
    this.showPopupDeleteCategory = $event
  }

}
