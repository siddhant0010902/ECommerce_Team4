
import { Routes } from '@angular/router';
import { NotFound } from './components/not-found/not-found';
import { Home } from './components/home/home';
import { CartComponent } from './components/cart/cart';
import { ProductsList } from './components/products-list/products-list';
import { ProductPage } from './components/product-page/product-page';
import { UserLogin } from './components/user-login/user-login';
import { UserRegister } from './components/user-register/user-register';
import { AboutUs } from './components/about-us/about-us';
import { NewArrivals } from './components/new-arrivals/new-arrivals';
import { DealsOfTheDay } from './components/deals-of-the-day/deals-of-the-day';
import { Sale } from './components/sale/sale';
import { ContactUs } from './components/contact-us/contact-us';
import { UserProfileComponent } from './components/user-profile/user-profile';

export const routes: Routes = [
    { path: "home", component: Home },
    { path: "", redirectTo: "home", pathMatch: "full" },
    {path: "home/cart", component: CartComponent},
    {path: "products", component: ProductPage},
    {path: "products-list", component: ProductsList},
    {path:"login",component: UserLogin},
    {path:"register",component: UserRegister},
    {path:"aboutus",component:AboutUs},
    {path:"new-arrivals",component: NewArrivals},
    {path:"deals-of-the-day", component: DealsOfTheDay},
    {path:"sale",component:Sale},
    {path:"contactus",component:ContactUs},
    {path:"user-profile",component:UserProfileComponent},
    { path: "**", component: NotFound }
];
