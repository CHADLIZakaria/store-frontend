import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  days = [...Array(31).keys()]
  months = [...Array(12).keys()]
  years = Array(2022 - 1970 + 1).fill(1970).map((year, index) => year + index).reverse()

  userForm!: FormGroup;

  constructor(private userService: UserService, private router: Router) {

  }
  
  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl(null),
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null)
    })
  }

  save() {
    this.userService.save(this.userForm.value).subscribe({
      next: data=> {
        console.log(data)
        this.router.navigate(['/login'])
      },
      error : err => {
        console.log(err)
      }
    })
    console.log(this.userForm.value)
  }




}
