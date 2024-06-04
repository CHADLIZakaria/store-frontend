import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  reviews!: paginationResponse<review>;
  reviewForm!: FormGroup;
  search: searchReview = {
    sort: 'id',
    direction: 'desc',
    idProduct: undefined
  };

  constructor(
    private route: ActivatedRoute, 
    private productsService: ProductsService, 
    private reviewService: ReviewService, 
    public authService: AuthService,
    private userService: UserService,
    private router: Router
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
    this.productsService.search({id: id}).subscribe(data => {
      if(data.totalElement===1) {
        this.product = data.data[0]
      }
      else {
        this.router.navigate(['/404'])
      }
    })
  }

  loadReviews() {
    this.reviewService.search(this.search).subscribe(data => {
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

  toggleFavorite(status: string, idProduct: number) {
    if(this.authService.isAuth) {
      const username = this.authService.userAuthValue?.username!
      if(status==='add') {
        this.productsService.addFavorite(username, idProduct).subscribe({
          next: (data) => {
            this.product!.inFavorites = true
          }
      })}
      else if(status==='remove') {
        this.productsService.removeFavorite(username, idProduct).subscribe({
            next: (data) => {
              this.product!.inFavorites = false
            }
        })
      }
    }
  }

}
