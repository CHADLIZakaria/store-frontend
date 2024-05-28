import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
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
  currentDay: number = new Date().getDate();
  currentMonth: number = new Date().getMonth()
  currentYear: number=new Date().getFullYear()
  isPassword: boolean = true

  url!: any;
  userForm!: FormGroup;

  constructor(private userService: UserService, private router: Router) {

  }
  
  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      email: new FormControl(null),
      imagePath: new FormControl(null)
    })
  }

  save() {
    if(this.userForm.valid) {
      this.userService.save(this.userForm.value).subscribe({
        next: data=> {
          this.router.navigate(['/login'])
        },
        error : err => {
        }
      })
    }
  }

  isRequiredError(field: string) {
    return this.userForm.controls[field].touched && this.userForm.controls[field].hasError('required')
  }

  toggleType() {
    this.isPassword = !this.isPassword
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.url = reader.result;
      };
      reader.readAsDataURL(file);

      this.userForm.patchValue({
        imagePath: file
      });
    }
  }


}
