import { Component, OnInit } from '@angular/core';
import { paginationResponse } from 'src/app/models/pagination-response.model';
import { product } from 'src/app/models/product.model';
import { searchReview } from 'src/app/models/search.model';
import { user } from 'src/app/models/user.model';
import { ProductsService } from 'src/app/services/products.service';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  reviews!: paginationResponse;
  products!: product[];
  users!: user[];
  filter: searchReview = {
    size: 5,
    page: 0,
    keyword: "",
    idProduct: -1,
    username: "",
    approved: undefined
  }
  constructor(private reviewsService: ReviewService, private productsService: ProductsService, private usersService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers()
    this.getProducts()
    this.getReviews()
  }

  getProducts() {
    this.productsService.findAll("").subscribe(data => {
      this.products = data
    })

  }
  
  getReviews() {
    this.reviewsService.search(this.filter).subscribe(data => {
      this.reviews = data
    })
  }

  getUsers() {
    this.usersService.findll().subscribe(data => {
      this.users = data
    })
  }

  onChangeKeyword($event: any) {
    this.filter.keyword = $event.target.value
    this.filter.page = 0
    this.getReviews()
  }

  onToggle($event: boolean) {
  }

  onPaginate(page: number) {
    this.filter.page = page
    this.getReviews()
  }

  onNext() {
    if(this.reviews.currentPage !== this.reviews.totalPages-1) {
      ++this.filter.page!; 
      this.getReviews()
    }
  }

  onPrev() {
    if(this.reviews.currentPage !== 0) {
      --this.filter.page!; 
      this.getReviews()
    }
  }

  onChangePageSize($event: any) {
    this.filter.size = $event.target.value
    this.filter.page = 0
    this.getReviews()
  }

  createPaginateList(currentPage: number, numberPages: number) {
    let list = []
    let len = 10
    let lastPage;
    if(numberPages-len>currentPage) {
      lastPage = currentPage+10
    }
    else {
      currentPage = currentPage - (len-numberPages+currentPage)
      lastPage=numberPages
    }
    for(let i=currentPage; i<lastPage; i++) {
      list.push(i)
    } 
    return list
  }
}
