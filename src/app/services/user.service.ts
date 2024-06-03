import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environnments/environnment';
import { user } from '../models/user.model';
import { paginationResponse } from '../models/pagination-response.model';
import { searchUser } from '../models/search.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  save(user: user): Observable<user> {
    let formData: FormData = new FormData();
    formData.append('username', user.username)
    formData.append('password', user.password)
    formData.append('firstName', user.firstName)
    formData.append('lastName', user.lastName)
    formData.append('email', user.email)
    formData.append('sex', user.sex)
    formData.append('phoneNumber', user.phoneNumber)
    formData.append('file', user.imagePath)
    
    return this.http.post<user>(environment.apiUrl+'user', formData)
  }

  findll() {
    return this.http.get<user[]>(`${environment.apiUrl}users`)
  }
  
  search(filter: searchUser) {
    return this.http.get<paginationResponse<user>>(`${environment.apiUrl}users/test/search?keyword=${filter.keyword}&page=${filter.currentPage}&size=${filter.sizePages}`)
  }

  findByUsername(username: string): Observable<user> {
    return this.http.get<user>(`${environment.apiUrl}user/${username}`)
  }
}
