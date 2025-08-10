// // src/app/cart.service.ts

// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { ProductListItem } from '../../product-list-page/products-list/product.types';


// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   private cartItems = new BehaviorSubject<ProductListItem[]>([]);
//   cartItems$ = this.cartItems.asObservable();

//   constructor() {}

//   addToCart(product: ProductListItem) {
//     const currentCart = this.cartItems.value;
//     const updatedCart = [...currentCart, product];
//     this.cartItems.next(updatedCart);
//     console.log('Product added to cart:', product.name);
//   }

//   getCartItems() {
//     return this.cartItems.value;
//   }
// }
