import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  userForm!: FormGroup;
  isPassword: boolean = true;
  messageError!: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  login() {
    //const _this = this;
    this.authService.login(this.userForm.value).subscribe(
      (data) => {
      },
      (err) => {
        this.messageError = err.error.message;
      },
    );
  }
    

  toggleType() {
    this.isPassword = !this.isPassword;
  }

  isRequiredError(field: string) {
    return this.userForm.controls[field].touched && this.userForm.controls[field].hasError('required')
  }
}
