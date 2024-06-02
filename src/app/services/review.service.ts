import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environnments/environnment';
import { review } from '../models/review.model';
import { paginationResponse } from '../models/pagination-response.model';
import { searchReview } from '../models/search.model';
import { product } from '../models/product.model';
import { user } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  findAllByProduct(idProduct: number) {
    return this.http.get<review[]>(environment.apiUrl+'product/'+idProduct+'/reviews')
  }

  search(filters: searchReview) {
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
    if(filters.username) {
      params = params.set("username", filters.username)
    }
    if(filters.idProduct) {
      params = params.set("idProduct", filters.idProduct)
    }
    if(filters.approved) {
      params = params.set("review", filters.approved)
    }
    if(filters.sort) {
      params = params.set("sort", filters.sort)
    }
    if(filters.direction) {
      params = params.set("direction", filters.direction)
    }
    return this.http.get<paginationResponse>(`${environment.apiUrl}reviews/search`, {params})
  }

  addReview(formValue: {rating: number, description: string}, product: product, user: user): Observable<review> {
    let review: review = {
      ...formValue,
      product: product,
      user: user,
    }
    return this.http.post<review>(`${environment.apiUrl}user/review`, review)
    
  }
}
