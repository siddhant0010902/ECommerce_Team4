import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductListItem } from '../models/product.types';

@Injectable({
  providedIn: 'root'
})
export class cartService {

  private initialCartItems: ProductListItem[] = [
//     { id: '1', name: 'IPhone 16 Pro Max', price: 50000, imageUrl: 'https://tse3.mm.bing.net/th?q=iPhone+16+Front+View&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.5&pid=InlineBlock&rm=3&mkt=en-IN&cc=IN&setlang=en&adlt=strict&t=1&mw=247', rating: 4.5, collection: 'New Arrivals', type: 'Mobiles', gender: 'Unisex', quantity: 1 },
//     { id: '2', name: 'T-shirt', price: 1500, imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.WzaBde0DiN6DGTjaZyQkogHaHa?w=198&h=198&c=7&r=0&o=5&dpr=1.5&pid=1.7', rating: 3.5, collection: 'Best Seller', type: 'T-Shirts', gender: 'Men', quantity: 1 },
//     { id: '3', name: 'Cargo Jeans', price: 2500, imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.nbaOhFm_5z1g-bgb3TsqQAHaJ3?w=202&h=269&c=7&r=0&o=5&dpr=1.5&pid=1.7', rating: 4.1, collection: 'Sale', type: 'Trousers', gender: 'Men', quantity: 1 },
//     { id: '4', name: 'Trousers For Men', price: 1000, imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.cek1h3W6DuGHxdgz-B6qjgAAAA?w=158&h=197&c=7&r=0&o=5&dpr=1.5&pid=1.7', rating: 4.0, collection: 'Best Seller', type: 'Trousers', gender: 'Men', quantity: 1},
 ];

  private cartItemsSubject = new BehaviorSubject<ProductListItem[]>(this.initialCartItems);

  cartItems$: Observable<ProductListItem[]> = this.cartItemsSubject.asObservable();

  constructor() { }

  addToCart(product: ProductListItem): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 0) + 1;
    } else {
      const newItem = { ...product, quantity: 1 };
      currentItems.push(newItem);
    }

    this.cartItemsSubject.next([...currentItems]);
  }

  getCartItems(): ProductListItem[] {
    return this.cartItemsSubject.value;
  }

  updateQuantity(index: number, change: number): void {
    const currentItems = this.cartItemsSubject.value;
    const item = currentItems[index];

    const newQuantity = (item.quantity ?? 0) + change;
    item.quantity = newQuantity;

    if (item.quantity < 1) item.quantity = 1;

    this.cartItemsSubject.next([...currentItems]);
  }

  removeItem(index: number): void {
    const currentItems = this.cartItemsSubject.value;
    currentItems.splice(index, 1);
    this.cartItemsSubject.next([...currentItems]);
  }

  getTotalPrice(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  }
}
