import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Subject, map, tap } from 'rxjs';
import { UserLogin } from '../models/userLogin.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userAuth = new Subject<UserLogin>();

  constructor(private http: HttpClient) { }

  login(user: {username: string, password: string}) {
    return this.http.post<UserLogin>(environment.apiUrl+'login', user).pipe(
      tap(
        (res: UserLogin) => {
          localStorage.setItem("token", res.access_token)
          this.userAuth.next(res)
          //localStorage.setItem("user", res.username)
      })      
    )
   
  }
}
