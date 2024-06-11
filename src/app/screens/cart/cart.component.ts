import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/category.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart!: Cart | null;

  constructor(private cartService: CartService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.cartService.searchCarts({username: this.authService.userAuthValue?.username}).subscribe(
      (data) => {
        if(data.length==0) {
          this.cart = null
        }
        else {
          this.cart = data[0]
        }

      } 
    )
  }

  getNumberArticles(): number {
    return this.cart!.products.reduce((sum, ele) => sum+ele.quantity,0)
  }

  getTotalPrice(): number {
    return this.cart!.products.reduce((sum, ele) => sum+ele.quantity*ele.price, 0)
  }

}
