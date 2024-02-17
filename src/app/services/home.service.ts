import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private productsService: ProductsService) { }

  
}
