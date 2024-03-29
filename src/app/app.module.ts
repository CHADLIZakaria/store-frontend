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
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteCategoryComponent } from './screens/categories/popup/delete-category/delete-category.component';
import { ProductsComponent } from './screens/products/products.component';
import { FormProductComponent } from './screens/products/form-product/form-product.component';
import { DeleteProductComponent } from './screens/products/popup/delete-product/delete-product.component';
import { DropDownDirective } from './directives/drop-down.directive';
import { UsersComponent } from './screens/users/users.component';

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
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
