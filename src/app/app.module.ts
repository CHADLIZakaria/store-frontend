import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './screens/home/home.component';
import { SigninComponent } from './screens/signin/signin.component';
import { SignupComponent } from './screens/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CategoriesComponent } from './screens/categories/categories.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductDetailsComponent } from './screens/product-details/product-details.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { FormCategoryComponent } from './screens/categories/popup/form-category/form-category.component';
import { DndDirective } from './dnd.directive';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteCategoryComponent } from './screens/categories/popup/delete-category/delete-category.component';
import { ProductsComponent } from './screens/products/products.component';
import { FormProductComponent } from './screens/products/form-product/form-product.component';
import { DeleteProductComponent } from './screens/products/popup/delete-product/delete-product.component';
import { DropDownDirective } from './directives/drop-down.directive';
import { UsersComponent } from './screens/users/users.component';
import { ReviewsComponent } from './screens/reviews/reviews.component';
import { AccordionComponent } from './components/accordion/accordion.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryNamePipe } from './pipes/category-name.pipe';
import { DropDown1Directive } from './directives/drop-down1.directive';
import { RangePricePipe } from './pipes/range-price.pipe';
import { NotFoundComponent } from './screens/not-found/not-found.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ReviewCountPipe } from './pipes/review-count.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ListProductsComponent } from './shared/components/list-products/list-products.component';
import { FavoritesComponent } from './screens/favorites/favorites.component';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    NavbarComponent,
    SidebarComponent,
    CategoriesComponent,
    ProductDetailsComponent,
    DashboardComponent,
    FormCategoryComponent,
    DndDirective,
    DeleteCategoryComponent,
    ProductsComponent,
    FormProductComponent,
    DeleteProductComponent,
    DropDownDirective,
    UsersComponent,
    ReviewsComponent,
    AccordionComponent,
    CategoryNamePipe,
    DropDown1Directive,
    RangePricePipe,
    NotFoundComponent,
    DropDownComponent,
    ReviewCountPipe,
    PaginationComponent,
    ListProductsComponent,
    FavoritesComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
