import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { category } from '../models/category.model';
import { paginationResponse } from '../models/pagination-response.model';
import { product } from '../models/product.model';
import { search } from '../models/search.model';

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

  search(search: search): Observable<paginationResponse> {
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

}
