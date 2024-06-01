import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { UserAuth, UserLogin } from '../models/userLogin.model';
import { environment } from 'src/environnments/environnment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubject: BehaviorSubject<UserAuth | null> = new BehaviorSubject<UserAuth | null>(null);
  user: Observable<any> = this.userSubject.asObservable();
  logoutTimer!: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  get userAuthValue() {
    return this.userSubject.value
  }
  
  public get isAuth() {
    const token = this.userAuthValue?.token
    if(!token) return false;
    const decodedToken:any = jwtDecode(token)
    return decodedToken?.exp*1000 > new Date().getTime();
  }
  public get isAdmin() {
    const token = this.userAuthValue?.token
    if(!token) return false;
    const decodedToken:any = jwtDecode(token)
    return decodedToken?.isAdmin || false;    
  }


  login(user: {username: string, password: string}) {
    return this.http.post<UserLogin>(environment.apiUrl+'login', user).pipe(
      map(
        (res: UserLogin) => {
          if(res && res.token) {
            const token: string = res.token;
            localStorage.setItem("token", token)
            this.autoLogin()
          }
          return res
      })      
    )   
  }

  autoLogin() {
    const token = localStorage.getItem('token')
    if(!token) {
      return;
    }
    const decodedToken:any = jwtDecode(token)
    const user: UserAuth = {
      username: decodedToken.username,
      imagePath: decodedToken.imagePath,
      token: token,
      expirationDate: new Date(decodedToken.exp * 1000)
    };
    if(new Date() <= user.expirationDate) {
      this.userSubject.next(user)
    }
    this.autoLogout(user.expirationDate.getTime() - new Date().getTime())
  }

  logout() {
    localStorage.removeItem("token")
    this.userSubject.next(null)
    this.router.navigate(['/login'])
    if(this.logoutTimer) {
      clearTimeout(this.logoutTimer)
    }
    this.logoutTimer=null
  }
  autoLogout(expirationDate: number) {
    this.logoutTimer = setTimeout(() => {
      this.logout()
    }, expirationDate)
  }

}


