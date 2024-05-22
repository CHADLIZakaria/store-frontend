import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { CategoryCount, category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoriesChanged = new Subject<category[]>
  categories: category[] = []

  constructor(private http: HttpClient) { }

  setCategories(categories: category[]) {
    this.categoriesChanged.next(categories)
  }

  getCategories() {
    return this.categories
  }

  save(category: category): Observable<category> {
    const formData = new FormData()
    formData.append("name", category.name)    
    formData.append("file", category.image)
    return this.http.post<category>(environment.apiUrl+'category', formData).pipe(
      tap(data => {
          this.categories.push(data)
          this.categoriesChanged.next(this.categories)
        }
      )
    )
  }

  findAll(): Observable<category[]> {
    return this.http.get<category[]>(environment.apiUrl+'categories').pipe(
      tap(data => {
        this.categories = data
        this.categoriesChanged.next(this.categories)
      })
    )
  }

  productCountByCategory(): Observable<CategoryCount[]> {
    return this.http.get<CategoryCount[]>(environment.apiUrl+'category/product/count')
  }

  delete(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl+'category/'+id).pipe(
      tap(data => {
        this.categories = this.categories.filter(category => category.id !== id)
        this.categoriesChanged.next(this.categories)
      })
    )
  }

 
}
