import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class cartService {
     cartItems = [
    // { name: 'IPhone 16 Pro Max', price: 50000, quantity: 1,image:'https://tse3.mm.bing.net/th?q=iPhone+16+Front+View&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.5&pid=InlineBlock&rm=3&mkt=en-IN&cc=IN&setlang=en&adlt=strict&t=1&mw=247',rating:4.5},
    { name: 'T-shirt', price: 1500, quantity: 1,image:'https://tse4.mm.bing.net/th/id/OIP.WzaBde0DiN6DGTjaZyQkogHaHa?w=198&h=198&c=7&r=0&o=5&dpr=1.5&pid=1.7',rating:3.5},
    { name: 'Cargo Jeans', price: 2500, quantity: 1,image:'https://tse3.mm.bing.net/th/id/OIP.nbaOhFm_5z1g-bgb3TsqQAHaJ3?w=202&h=269&c=7&r=0&o=5&dpr=1.5&pid=1.7',rating:4.1 },
    { name: 'Trousers For Men', price: 1000, quantity: 1,image:'https://tse1.mm.bing.net/th/id/OIP.cek1h3W6DuGHxdgz-B6qjgAAAA?w=158&h=197&c=7&r=0&o=5&dpr=1.5&pid=1.7',rating:4.0},
  ];
 
  getCartItems() {
    return this.cartItems;
  }
 
  updateQuantity(index: number, change: number) {
    const item = this.cartItems[index];
    item.quantity += change;
    if (item.quantity < 1) item.quantity = 1;
  }
 
  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
 
}
 