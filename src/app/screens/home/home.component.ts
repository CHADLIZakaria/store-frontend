import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AccordionComponent } from 'src/app/components/accordion/accordion.component';
import { CategoryCount, RangePriceCount, ReviewCount, category } from 'src/app/models/category.model';
import { paginationResponse } from 'src/app/models/pagination-response.model';
import { product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
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
  reviewsFilter!: ReviewCount[];
  
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
    reviews: ""
  }
  @ViewChild("categoryFilter") categoryFilter!: AccordionComponent;
  @ViewChild("priceFilter") priceFilter!: AccordionComponent;
  @ViewChild("reviewFilter") reviewFilter!: AccordionComponent;
  
  keyword!: FormControl;
  username?: string;

  constructor(
    private categoryService: CategoryService, 
    private productsService: ProductsService,
    private authService: AuthService
  ) {
    this.keyword = new FormControl(null);
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
    this.productsService.productCountByReviews().subscribe(
      data => {
        this.reviewsFilter = data
      }
    )
    
    if(this.authService.isAuth) {
      this.username = this.authService.userAuthValue?.username;
    }
   
    this.keyword.valueChanges.subscribe(value => {
      this.filters.keyword = value
      this.filters.page=0
      this.findProducts()
    })
    this.findProducts()
  }

  findProducts() {
    this.productsService.search(this.filters, this.username).subscribe(
      data => {
        this.products = data
      }
    )
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
    return 'translateX(' + (-100 * this.currentIndexCategory) + '%)';
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
    if(value.type==='review') { 
      if(value.value) {
        this.filters.reviews = value.key
      }
      else {
        this.filters.reviews = ""  
      }
    }
    this.filters.page=0
    this.findProducts()
  }


  onChangePage(value: {type: string, value: number | null}) {
    switch(value.type) {
      case "paginate": this.onPaginate(value.value!); break;
      case "next": this.onNext(); break;
      case "prev": this.onPrev(); break;
    }
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

  onReset() {
    this.categoryFilter.resetFilters()
    this.priceFilter.resetFilters()    
    this.reviewFilter.resetFilters()    
    this.filters = {
      ...this.filters,
      keyword: "",
      categories: "",
      prices: "",
      page: 0,
      reviews: ""
    }
    this.keyword.setValue(null)
    this.findProducts()
  }

  onChangePageSize($event: any) {
    this.filters.size = $event.target.value
    this.filters.page = 0
    this.findProducts()
  }

}
