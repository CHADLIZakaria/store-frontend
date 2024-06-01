import { HttpClient } from '@angular/common/http';
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

  search(filter: searchReview) {
    return this.http.get<paginationResponse>(`${environment.apiUrl}reviews/search?keyword=${filter.keyword}&page=${filter.currentPage}&size=${filter.sizePages}&idProduct=${filter.idProduct}&username=${filter.username}&approved=${filter.approved}`)
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
