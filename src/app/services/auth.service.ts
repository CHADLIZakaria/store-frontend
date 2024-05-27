import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { UserLogin } from '../models/userLogin.model';
import { environment } from 'src/environnments/environnment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userAuth!: BehaviorSubject<any>;
  user!: Observable<any>;

  constructor(private http: HttpClient, private router: Router) { 
   
    this.userAuth = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user') ?? '{}'))
    this.user = this.userAuth.asObservable()    
  }

  get userAuthValue() {
    return this.userAuth.value
  }

  login(user: {username: string, password: string}) {
    return this.http.post<UserLogin>(environment.apiUrl+'login', user).pipe(
      map(
        (res: UserLogin) => {
          if(res && res.access_token) {
            localStorage.setItem("user", JSON.stringify(res))
            this.userAuth.next(res)
          }
          return res
      })      
    )   
  }

  public get isAuth() {
    const token = this.userAuthValue?.access_token
    if(!token) return false;
    const decodedToken:any = jwtDecode(token)
    return decodedToken?.exp*1000 > new Date().getTime();
  }
  public get isAdmin() {
    const token = this.userAuthValue?.access_token
    if(!token) return false;
    const decodedToken:any = jwtDecode(token)
    return decodedToken?.isAdmin || false;    
  }

  autoLogin() {
    setTimeout(() => {

    })

  }


  logout() {
    localStorage.removeItem("user")
    this.userAuth.next(null)
    this.router.navigate(['/login'])
  }
}
