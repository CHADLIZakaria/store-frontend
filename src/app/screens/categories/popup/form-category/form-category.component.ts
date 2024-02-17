import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.css']
})
export class FormCategoryComponent implements OnInit {
  url!: any;
  categoryForm!: FormGroup
  @Output() toggle = new EventEmitter<boolean>()

  constructor(private sanitizer: DomSanitizer, private categoryService: CategoryService) {
  } 
  
  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl(null),
      image: new FormControl(null),
    });
  }

  close() {
    this.toggle.emit(false)
  }

  onFileDropped($evnt: any) {
    this.url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL($evnt));
    this.categoryForm.patchValue({
      image: $evnt
    })
  }

  save() {
    console.log(this.categoryForm.value)
    this.categoryService.save(this.categoryForm.value).subscribe({
      next: (data) => {
        this.close()
      }
    })
  }

}
