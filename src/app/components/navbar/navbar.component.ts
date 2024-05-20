import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserLogin } from 'src/app/models/userLogin.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() toggleSidebar =  new EventEmitter<boolean>();
  isShow = false
  isLogin = false
  userLogin: UserLogin={
    "access_token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhdHVueTAiLCJpc0FkbWluIjp0cnVlLCJleHAiOjE3MDg1NDUwODQsImlhdCI6MTcwODQ1ODY4NH0.Xy-tSjCwZZNUStSOXInFj6ZJNTRR4s3Zpx75OzIUNlEoOLThbfbgpMDjC2SF_uGmXJU6a-B7pQctw1CcOP82vA",
    "imagePath": "http://localhost:8080/api/files/upload/user_1.jpg",
    "isAdmin": true,
    "expires_in": 86399983,
    "username": "atuny0"
};

  constructor(private authService: AuthService) {

  }


  ngOnInit(): void {
    this.authService.userAuth.subscribe(data => {
      if(data !=null) {
        this.isLogin = true
        this.userLogin = data
      }
    })
  }
  

  onToggle() {
    this.isShow = ! this.isShow
    this.toggleSidebar.emit(this.isShow)
  }

}
