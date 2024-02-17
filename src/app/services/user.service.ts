import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { user } from '../models/user.model';

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
    console.log(user)
    return this.http.post<user>(environment.apiUrl+'user', formData)
  }
}
