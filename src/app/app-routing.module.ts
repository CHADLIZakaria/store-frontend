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
import { ReviewsComponent } from './screens/reviews/reviews.component';
import { NotFoundComponent } from './screens/not-found/not-found.component';
import { AdminGuard } from './guards/admin.guard';
import { FavoritesComponent } from './screens/favorites/favorites.component';

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Home'},
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent, 
      },
      {
        path: 'favorites',
        component: FavoritesComponent, 
        data: { breadcrumb: 'Favorites'},
      },
      {
        component: ProductDetailsComponent, 
        path: 'product/:id',
        data: { breadcrumb: 'Details'},
      },  
    ]
  },
  {component: SigninComponent, path: 'login'},
  {component: SignupComponent, path: 'signup'},
  { path: 'admin', 
    canActivate: [AdminGuard],
    children: [
      {component: DashboardComponent, path: 'dashboard'},
      {component: CategoriesComponent, path: 'categories'},
      {component: FormProductComponent, path: 'products/save'},
      {component: ProductsComponent, path: 'products'},
      {component: UsersComponent, path: 'users'},
      {component: ReviewsComponent, path: 'reviews'},
    ]
  },  
  {component: NotFoundComponent, path:'**'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
