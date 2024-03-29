import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './screens/categories/categories.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { HomeComponent } from './screens/home/home.component';
import { ProductDetailsComponent } from './screens/product-details/product-details.component';
import { FormProductComponent } from './screens/products/form-product/form-product.component';
import { ProductsComponent } from './screens/products/products.component';
import { SigninComponent } from './screens/signin/signin.component';
import { SignupComponent } from './screens/signup/signup.component';
import { UsersComponent } from './screens/users/users.component';

const routes: Routes = [
  {component: HomeComponent, path: ''},
  {component: SigninComponent, path: 'signin'},
  {component: SignupComponent, path: 'signup'},
  {component: ProductDetailsComponent, path: 'product/:id'},
  {component: CategoriesComponent, path: 'categories'},
  {component: ProductsComponent, path: 'products'},
  {component: UsersComponent, path: 'users'},
  {component: FormProductComponent, path: 'products/save'},
  {component: DashboardComponent, path: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
