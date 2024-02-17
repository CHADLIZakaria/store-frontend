import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() toggleSidebar =  new EventEmitter<boolean>();
  isShow = false
  isLogin = false

  onToggle() {
    this.isShow = ! this.isShow
    this.toggleSidebar.emit(this.isShow)
  }

}
