import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  products!: product[];
  constructor(private productsService: ProductsService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.findProducts()
  }

  findProducts() {
    this.productsService.favoriteProducts(this.authService.userAuthValue?.username!).subscribe(
      data => {
        this.products = data
      }
    )
  }

}
