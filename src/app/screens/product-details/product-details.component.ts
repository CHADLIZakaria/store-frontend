import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { paginationResponse } from 'src/app/models/pagination-response.model';
import { product } from 'src/app/models/product.model';
import { review } from 'src/app/models/review.model';
import { searchReview } from 'src/app/models/search.model';
import { user } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: product | undefined;
  routeSub: Subscription | undefined;
  reviews!: paginationResponse;
  reviewForm!: FormGroup;
  search: searchReview = {
    sort: 'id',
    direction: 'desc',
    idProduct: undefined
  };

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductsService, 
    private reviewService: ReviewService, 
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      let id = params['id']
      this.search.idProduct=id
      this.loadProductDetail(id)
      this.loadReviews()
    });
    this.reviewForm = new FormGroup({
      rating: new FormControl(1),
      description: new FormControl(null)
    })
   
  }

  loadProductDetail(id: number) {
    this.productService.findById(id).subscribe(data => {
      this.product = data
    })
  }

  loadReviews() {
    this.reviewService.search(this.search).subscribe(data => {
      console.log(data)
      this.reviews = data
    })
  }

  getNumberArray(num: number): number[] {
    return Array(Math.floor(num)).fill(0).map((_, index) => index + 1);
  }

  getRateReviews(): number {
    if(this.reviews.data.length==0) return 0;
    let res = 0;
    this.reviews?.data.forEach(review => {
        res += review.rating
    })
    return res/this.reviews.data.length
  }

  countNumberRate(rate: number) {
    return this.reviews.data.filter(review => review.rating == rate).length
  }

  chooseRateStar(rate: number) {
    this.reviewForm.controls['rating'].setValue(rate)
  }


  addReview() {
    this.userService.findByUsername(this.authService.userAuthValue?.username!).pipe(
      switchMap((data: user) => {
        return this.reviewService.addReview(this.reviewForm.value, this.product!, data)
      })
    ).subscribe(
      response => {
        this.reviews.data.push(response)
      }
    )
  }

  onChangeSort(value: number) {
    switch(value) {
      case 0: this.search.sort='id'; this.search.direction='desc'; break;
      case 1: this.search.sort='rating'; this.search.direction='desc'; break;
      case 2: this.search.sort='rating'; this.search.direction='asc'; break;      
    }
    this.loadReviews()
  }

}
