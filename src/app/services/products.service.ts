import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { RangePriceCount, category } from '../models/category.model';
import { paginationResponse } from '../models/pagination-response.model';
import { product } from '../models/product.model';
import { searchProduct } from '../models/search.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsChanged = new Subject<paginationResponse>
  products!: paginationResponse


  constructor(private http: HttpClient) { }

  save(product: product, category: category) {
    let formData = new FormData()
    formData.append("title", product.title)
    formData.append("file", product.image)
    formData.append("price", product.price.toString())
    formData.append("description", product.description)

    formData.append("category.id", category.id.toString())
    formData.append("category.name", category.name)
    formData.append("category.imagePath", category.imagePath)
    return this.http.post(environment.apiUrl+'product', formData)
  }

  findAll(ids: string): Observable<product[]> {
    return this.http.get<product[]>(environment.apiUrl+'products?idsCategory='+ids)
  }

  search1(search: searchProduct): Observable<paginationResponse> {
    return this.http.get<paginationResponse>(environment.apiUrl+`products/search?page=${search.currentPage}&size=${search.sizePages}&idsCategory=${search.idsCategory}&keyword=${search.keyword}`).pipe(
      tap(
        data => {
          this.products = data
          this.productsChanged.next(this.products)
        })
    )
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl+'product/'+id).pipe(
      tap(data => {
        this.products.data = this.products.data.filter(product => product.id !== id)
        this.productsChanged.next(this.products)
      })
    )
  }

  findById(id: number): Observable<product> {
    return this.http.get<product>(environment.apiUrl+'product/'+id)
  }

  search(filters: any): Observable<paginationResponse> {
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

  productCountByRangePrice(): Observable<RangePriceCount[]> {
    return this.http.get<RangePriceCount[]>(environment.apiUrl+'products/prices/count')
  }



}
