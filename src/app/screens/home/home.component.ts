import { Component, OnInit } from '@angular/core';
import { category } from 'src/app/models/category.model';
import { product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories!: category[];
  products!: product[];
  categoriesSelected: category[] = [];
  currentIndexCategory: number=0;
  
  constructor(private categoryService: CategoryService, private productsService: ProductsService) {

  }

  previousCarousel() {
    let currentValue = this.currentIndexCategory
    let intervalId = setInterval(() => {  
      if(currentValue-1 < this.currentIndexCategory) {
        this.currentIndexCategory -= 1;
      }
      else {
        clearInterval(intervalId)
      }
    }, 500);
  }
  nextCarousel() {
      let currentValue = this.currentIndexCategory
      let intervalId = setInterval(() => {  
        if(currentValue + 1 > this.currentIndexCategory ) {
          this.currentIndexCategory += 1;
        }
        else {
          clearInterval(intervalId)
        }
    }, 500);
    
  }

  ngOnInit(): void {
    this.categoryService.findAll().subscribe(
      data => {
        this.categories = data
      }
    )
    this.findAll()
    
  }

  findAll() {
    let ids=""
    this.categoriesSelected.forEach(category => {
      ids += category.id+","
    })
    
    this.productsService.findAll(ids).subscribe(
      data => {
        this.products = data
      }
    )

  }

  toggleCategorySelected(category: category) {
    if(this.categoriesSelected.includes(category)) {
      this.categoriesSelected = this.categoriesSelected.filter(data => data.id !== category.id)
    }
    else {
      this.categoriesSelected.push(category)  
    }
    this.findAll()

  }

}
