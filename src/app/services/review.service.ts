import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  findAllByProduct(idProduct: number) {
    return this.http.get<review[]>(environment.apiUrl+'product/'+idProduct+'/reviews')
  }
}
