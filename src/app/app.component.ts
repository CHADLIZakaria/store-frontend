import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 
})
export class AppComponent implements OnInit {
  
  constructor(private authService: AuthService) {

  }


  ngOnInit(): void {
    this.authService.autoLogin()
  }
  isShow: boolean = false;

  toggleSidebar($event: boolean) {
    this.isShow = $event
  }
  close() {
    this.isShow=false
  }
}
