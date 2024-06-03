import { Component } from '@angular/core';
import { category } from 'src/app/models/category.model';
import { paginationResponse } from 'src/app/models/pagination-response.model';
import { searchUser } from 'src/app/models/search.model';
import { user } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users!: paginationResponse<user>;
  showPopupDeleteProduct: boolean=false;
  categories!: category[];
  categoriesSelected: category[]= []
  search: searchUser = {
    sizePages: 5,
    currentPage: 0,
    keyword: ""
  };
  
  constructor(private usersService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.usersService.search(this.search).subscribe(
      data => {
        this.users = data
      }
    )
  }

  onToggle($event: boolean) {
    this.showPopupDeleteProduct = $event
  }

  onChangePageSize($event: any) {
    this.search.sizePages = $event.target.value
    this.search.currentPage = 0
    this.getUsers()
  }

  onPaginate(page: number) {
    this.search.currentPage = page
    this.getUsers()
  }

  onNext() {
    if(this.users.currentPage !== this.users.totalPages-1) {
      ++this.search.currentPage; 
      this.getUsers()
    }
  }

  onPrev() {
    if(this.users.currentPage !== 0) {
      --this.search.currentPage; 
      this.getUsers()
    }
  }

  onChangeKeyword($event: any) {
    this.search.keyword = $event.target.value
    this.search.currentPage = 0
    this.getUsers()
  }
  
}
