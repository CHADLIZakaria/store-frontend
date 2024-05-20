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

  
}
