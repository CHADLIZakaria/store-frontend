import { trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  isLogin = false
  searchProducts: product[]= [];
  searchControl!: FormControl;


  constructor(private authService: AuthService, private productService: ProductsService) {
    this.searchControl = new FormControl('')    
  }

  findProducts() {
    this.productService.search({size: 1000, keyword: this.searchControl.value}).subscribe(data => {
      this.searchProducts = data.data;
    })
  }


  ngOnInit(): void {
    this.authService.userAuth.subscribe(data => {
      if(data != null) {
        this.isLogin = true
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

}
