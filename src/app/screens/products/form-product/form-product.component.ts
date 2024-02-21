import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {
  url!: any;
  productForm!: FormGroup;
  categories!: category[];

  constructor(private sanitizer: DomSanitizer, private categoryService: CategoryService, private productService: ProductsService, private router: Router) {}
  
  ngOnInit(): void {
    this.categoryService.findAll().subscribe({
      next: (data) => {
        this.categories = data
      }
    })
    this.productForm = new FormGroup({
      title: new FormControl(null),
      price: new FormControl(null),
      description: new FormControl(null),
      category: new FormControl(null),
      image: new FormControl(null),
    });
  }


  onFileDropped($evnt: any) {
    this.url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL($evnt));
    this.productForm.patchValue({
      image: $evnt
    })
  }

  save() {
    const category = this.categories.filter(category => this.productForm.value.category === category.id.toString())[0]
    this.productService.save(this.productForm.value, category).subscribe({
      next: (data) => {
        this.router.navigate(['/products'])
        console.log(data)
      }
    })
  }

}
