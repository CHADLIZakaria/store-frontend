import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environnments/environnment';
import { Cart } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient ) { }

  searchCarts(filters: any):Observable<Cart[]> {
    let params = new HttpParams();
    if(filters.username) {
      params = params.set("username", filters.username)
    }
    return this.http.get<Cart[]>(`${environment.apiUrl}carts/search`, {params})
  }
}