import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { product } from '../models/product.model';
import { paginationResponse } from '../models/pagination-response.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  findAll(filters: any): Observable<paginationResponse> {
    let params = new HttpParams()
    if(filters.size) {
      params = params.set("size", filters.size)
    }
    if(filters.page) {
      params = params.set("page", filters.page)
    }
    if(filters.keyword) {
      params = params.set("keyword", filters.keyword)
    }
    if(filters.categories) {
      params = params.set("categories", filters.categories)
    }
    if(filters.prices) {
      const [minPrice, maxPrice] = filters.prices.split('-')
      params = params.set("minPrice", minPrice)
      if(maxPrice) {
        params = params.set("maxPrice", maxPrice)
      }
    }
    if(filters.sort) {
      params = params.set("sort", filters.sort)
    }
    if(filters.direction) {
      params = params.set("direction", filters.direction)
    }
    return this.http.get<paginationResponse>(environment.apiUrl+'products/search', {params})
  }
}
