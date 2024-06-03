import { Component, OnInit } from '@angular/core';
import { category } from 'src/app/models/category.model';
import { paginationResponse } from 'src/app/models/pagination-response.model';
import { product } from 'src/app/models/product.model';
import { searchProduct } from 'src/app/models/search.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products!: paginationResponse<product>;
  showPopupDeleteProduct: boolean=false;
  categories!: category[];
  categoriesSelected: category[]= []
  search: searchProduct = {
    sizePages: 3,
    currentPage: 0,
    keyword: "",
    idsCategory: ""
  };
  
  constructor(private productsService: ProductsService, private categoryService: CategoryService) {

  }

  ngOnInit(): void {
    this.categoryService.findAll().subscribe(
      data => {
        this.categories = data
      }
    )

    this.productsService.productsChanged.subscribe((products: paginationResponse<product>) => {
        this.products = products
      }
    )
    this.getProducts()
  }

  getProducts() {
    this.search.idsCategory=""
    this.categoriesSelected.forEach(category => {
      this.search.idsCategory += category.id+","
    })
    this.productsService.search(this.search).subscribe({
      next: (data) => {
        this.products = data
      }
    })
  }

  onToggle($event: boolean) {
    this.showPopupDeleteProduct = $event
  }

  onChangePageSize($event: any) {
    this.search.sizePages = $event.target.value
    this.search.currentPage = 0
    this.getProducts()
  }

  onPaginate(page: number) {
    this.search.currentPage = page
    this.getProducts()
  }

  onNext() {
    if(this.products.currentPage !== this.products.totalPages-1) {
      ++this.search.currentPage; 
      this.getProducts()
    }
  }

  onPrev() {
    if(this.products.currentPage !== 0) {
      --this.search.currentPage; 
      this.getProducts()
    }
  }

  onToggleCategorySelected(category: category) {
    this.search.currentPage = 0
    if(this.categoriesSelected.includes(category)) {
      this.categoriesSelected = this.categoriesSelected.filter(data => data.id != category.id)
    }
    else {
      this.categoriesSelected.push(category)  
    }
    this.getProducts()
  }

  onChangeKeyword($event: any) {
    this.search.keyword = $event.target.value
    this.search.currentPage = 0
    this.getProducts()
  }
  

}
