import { trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { product } from 'src/app/models/product.model';
import { UserLogin } from 'src/app/models/userLogin.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Output() toggleSidebar =  new EventEmitter<boolean>();
  @Input() statusSidebar!: boolean;
  searchProducts: product[]= [];
  searchControl!: FormControl;
  isLogin!: boolean;
  isAdmin!: boolean;
  user!: any;

  constructor(public authService: AuthService, private productService: ProductsService, private router: Router) {
    this.searchControl = new FormControl('')    
  }

  findProducts() {
    this.productService.search({size: 1000, keyword: this.searchControl.value}).subscribe(data => {
      this.searchProducts = data.data;
    })
  }


  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.isLogin = this.authService.isAuth
      this.isAdmin = this.authService.isAdmin
      this.user = user
      if(this.isAdmin) {
        this.router.navigate(['/admin/dashboard'])
      }
      else if(this.isLogin) {
        this.router.navigate(['/'])
      }
    })   
    this.searchControl.valueChanges.subscribe(value => {
      if(value==='') {
        this.searchProducts=[]
      }
      else {
        this.findProducts();
      }
    });
  }

  onToggle() {
    this.statusSidebar = !this.statusSidebar
    this.toggleSidebar.emit(this.statusSidebar)
  }

  logout() {
    this.authService.logout()
  }

  onClickElement(value: string) {
    if(value==='logout') {
      this.authService.logout()
    }
  }

}
