import { Routes } from '@angular/router';
import { Header } from './components/header/header';
import { NotFound } from './components/not-found/not-found';
import { Home } from './home/home';
import { CartComponent } from './components/cart/cart';
import { ProductsList } from './product-list-page/products-list/products-list';
import { ProductPage } from './product-page/product-page';

export const routes: Routes = [
    { path: "home", component: Home },
    { path: "", redirectTo: "home", pathMatch: "full" },
    {path: "home/cart", component: CartComponent},
    {path: "products", component: ProductPage},
    { path: "**", component: NotFound },
    
];
