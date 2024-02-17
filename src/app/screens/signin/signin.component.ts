import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  constructor(private authService: AuthService) {

  }

  login() {
    this.authService.login("atuny0", "9uQFF1Lh").subscribe(data => {
      console.log(data)
    })
  }
}
