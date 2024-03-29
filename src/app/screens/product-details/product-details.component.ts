import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { product } from 'src/app/models/product.model';
import { review } from 'src/app/models/review.model';
import { ProductsService } from 'src/app/services/products.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: product | undefined;
  routeSub: Subscription | undefined;
  reviews: review[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductsService, private reviewService: ReviewService) {
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      let id = params['id']
      this.loadProductDetail(id)
      this.loadReviews(id)
    });
   
  }

  loadProductDetail(id: number) {
    this.productService.findById(id).subscribe(data => {
      this.product = data
    })
  }

  loadReviews(id: number) {
    this.reviewService.findAllByProduct(id).subscribe(data => {
      this.reviews = data
    })
  }

  getNumberArray(num: number): number[] {
    return Array(Math.floor(num)).fill(0).map((_, index) => index + 1);
  }


  getRateReviews(): number {
    let res = 0;
    this.reviews?.forEach(review => {
        res += review.rating
    })
    return res/this.reviews.length
  }

  countNumberRate(rate: number) {
    return this.reviews.filter(review => review.rating == rate).length
  }


}
