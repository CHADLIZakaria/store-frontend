import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs!: Array<{label: string, url: string}>

  constructor(private brundcumbService: BreadcrumbService) {

  }

  ngOnInit(): void {
    this.breadcrumbs = this.brundcumbService.breadcrumbs;
  }

}
