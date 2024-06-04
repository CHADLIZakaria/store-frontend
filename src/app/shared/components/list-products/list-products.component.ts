import { Component, Input } from '@angular/core';
import { product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent {
  @Input() products!: product[];

  constructor(public authService: AuthService, private productsService: ProductsService) {
  }
  toggleFavorite(status: string, idProduct: number) {
    if(this.authService.isAuth) {
      const username = this.authService.userAuthValue?.username!
      if(status==='add') {
        this.productsService.addFavorite(username, idProduct).subscribe(
          data => {
            this.products.map(product => {
              if(product.id !== idProduct) {
                return product; 
              }
              else {
                product.inFavorites = true;
                return product;
              } 
            })
          }
        )
      }
      else if(status==='remove') {
        this.productsService.removeFavorite(username, idProduct).subscribe(
          data => {
            this.products.map(product => {
              if(product.id !== idProduct) {
                return product; 
              }
              else {
                product.inFavorites = false;
                return product;
              } 
            })
          }  
        )
      }
    }
  }
}
