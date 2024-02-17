import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent {
  
  @Input() id!: number;

  constructor(private productService: ProductsService) {}

  @Output() toggle = new EventEmitter<boolean>()

  close() {
    this.toggle.emit(false)
  }

  save() {
    this.productService.delete(this.id).subscribe({
      next: (data) => {
        this.toggle.emit(false)
      }
    })
  }

}
