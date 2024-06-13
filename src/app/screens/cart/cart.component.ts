import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/category.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart!: Cart | null;
  idUser!: number;

  constructor(
    private cartService: CartService, 
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.userService.findByUsername(this.authService.userAuthValue?.username!).subscribe((data) => {
      this.idUser = data.id
    })
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

  addQuantity(idProduct: number){
    this.cartService.addQuantity(idProduct, this.idUser).subscribe(() => {
      this.cart!.products = this.cart?.products.map(cartProduct => cartProduct.idProduct===idProduct ? {...cartProduct, quantity: cartProduct.quantity+1}: cartProduct)!
    })
  }
  removeQuantity(idProduct: number){
    this.cartService.removeQuantity(idProduct, this.idUser).subscribe(() => {
      this.cart!.products = this.cart?.products.map(cartProduct => cartProduct.idProduct===idProduct ? {...cartProduct, quantity: cartProduct.quantity - 1}: cartProduct)!
    })
  }


  getNumberArticles(): number {
    return this.cart!.products.reduce((sum, ele) => sum+ele.quantity,0)
  }

  getTotalPrice(): number {
    return this.cart!.products.reduce((sum, ele) => sum+ele.quantity*ele.price, 0)
  }

}
