import { Component, OnInit } from '@angular/core';
import { CategoryCount, RangePriceCount, category } from 'src/app/models/category.model';
import { paginationResponse } from 'src/app/models/pagination-response.model';
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
  categoriesFilter!: CategoryCount[];
  pricesFilter!: RangePriceCount[];
  
  
  products!: paginationResponse;
  currentIndexCategory: number=0;
  filters = {
    keyword: "",
    categories: "",
    prices: "",
    size: 9,
    sort: "",
    direction: "",
    page: 0,
  }

  constructor(private categoryService: CategoryService, private productsService: ProductsService) {
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
    this.categoryService.productCountByCategory().subscribe(
      data => {
        this.categoriesFilter = data
      }
    )

    this.productsService.productCountByRangePrice().subscribe(
      data => {
        this.pricesFilter = data
      }
    )

    this.findProducts()
    
  }

  findProducts() {
    this.productsService.search(this.filters).subscribe(
      data => {
        this.products = data
      }
    )
  }

  onChangeKeyword(event: Event) {
    this.filters.keyword = (event.target as HTMLInputElement).value
    this.filters.page=0
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
    this.filters.page=0
    this.findProducts()
  }

  onPaginate(page: number) {
    this.filters.page = page
    this.findProducts()
  }

  onNext() {
    if(this.products.currentPage !== this.products.totalPages-1) {
      ++this.filters.page; 
      this.findProducts()
    }
  }

  onPrev() {
    if(this.products.currentPage !== 0) {
      --this.filters.page; 
      this.findProducts()
    }
  }


  onChangePageSize($event: any) {
    this.filters.size = $event.target.value
    this.filters.page = 0
    this.findProducts()
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
