import { Component, OnInit } from '@angular/core';
import { category } from 'src/app/models/category.model';
import { product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { HomeService } from 'src/app/services/home.service';
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
  filters = {
    keyword: "",
    categories: "",
    prices: "",
    size: 40,
    sort: "",
    direction: ""
  }

  constructor(private categoryService: CategoryService, private productsService: ProductsService, private homeService: HomeService) {
  }

  previousCarousel() {   
    if(this.currentIndexCategory != 0) {
      this.currentIndexCategory -= 1;
    }
  }
  nextCarousel() {
    if(this.currentIndexCategory < this.categories.length - 4) {
      this.currentIndexCategory += 1;
    }
  }

  ngOnInit(): void {
    this.categoryService.findAll().subscribe(
      data => {
        this.categories = data
      }
    )
    this.findProducts()
    
  }

  findProducts() {
    this.homeService.findAll(this.filters).subscribe(
      data => {
        this.products = data.data
      }
    )
  }

  onChangeKeyword(event: Event) {
    this.filters.keyword = (event.target as HTMLInputElement).value
    this.findProducts()
  }
  onSortChange(event: Event) {
    switch((event.target as HTMLInputElement).value) {
      case "0": this.filters.sort="id"; this.filters.direction="asc"; break;
      case "1": this.filters.sort="price";  this.filters.direction="asc"; break;
      case "2": this.filters.sort="price";  this.filters.direction="desc"; break;    
    }
    this.findProducts()
  }

  toggleCategorySelected(category: category) {
    if(this.categoriesSelected.includes(category)) {
      this.categoriesSelected = this.categoriesSelected.filter(data => data.id !== category.id)
    }
    else {
      this.categoriesSelected.push(category)  
    }
    this.findProducts()
  }

  getTranslation() {
    return  'translateX(' + (-100 * this.currentIndexCategory) + '%)';
  }

  changeFiltre(value: {type: string, key: string, value: boolean}) {
    if(value.type==='category') {
      if(value.value) {
        this.filters.categories = this.filters.categories ? this.filters.categories.split(',').concat(value.key).join(','):value.key
      }
      else {
        this.filters.categories = this.filters.categories.split(',').filter(key => key !== value.key).join(',')  
      }
    }
    if(value.type==='price') {     
      if(value.value) {
        this.filters.prices = value.key
      }
      else {
        this.filters.prices = ""  
      }
    }
    this.findProducts()
  }

}
