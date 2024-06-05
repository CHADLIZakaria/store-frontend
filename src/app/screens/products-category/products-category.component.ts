import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AccordionComponent } from 'src/app/components/accordion/accordion.component';
import { CategoryCount, RangePriceCount, ReviewCount, category } from 'src/app/models/category.model';
import { paginationResponse } from 'src/app/models/pagination-response.model';
import { product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-category',
  templateUrl: './products-category.component.html',
  styleUrls: ['./products-category.component.css']
})
export class ProductsCategoryComponent {
  pricesFilter!: RangePriceCount[];
  reviewsFilter!: ReviewCount[];
  
  products!: paginationResponse<product>;
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

  constructor(private productsService: ProductsService, public authService: AuthService) {
    this.keyword = new FormControl(null);
  }


  ngOnInit(): void {
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
    this.productsService.search(this.filters).subscribe(
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
