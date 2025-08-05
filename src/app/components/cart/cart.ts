import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { cartService } from '../../services/cart-Service';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent {
  cartItems: any[] = [];
  savedItems: any[] = [];
  couponCode: string = '';
  appliedDiscount: number = 0;
  totalAmount: number = 0;

  constructor(private cartService: cartService) {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  changeQuantity(index: number, delta: number): void {
    const item = this.cartItems[index];
    const newQty = item.quantity + delta;

    if (newQty >= 1 && newQty <= 5) {
      item.quantity = newQty;

      // Trigger UI update
      this.cartItems = [...this.cartItems];
      this.calculateTotal();
    } else if (newQty > 5) {
      alert('Maximum quantity allowed is 5.');
    }
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (this.appliedDiscount > 0) {
      this.totalAmount -= this.appliedDiscount;
    }
  }

  applyCoupon(): void {
    const code = this.couponCode.trim().toUpperCase();

    if (code === 'SAVE50') {
      this.appliedDiscount = 50;
      alert('Coupon applied: ₹50 off!');
    } else if (code === 'DISCOUNT10') {
      const subtotal = this.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      this.appliedDiscount = subtotal * 0.1;
      alert('Coupon applied: 10% off!');
    } else {
      alert('Invalid coupon code.');
      this.appliedDiscount = 0;
    }

    this.calculateTotal();
  }

  confirmRemove(index: number): void {
    if (window.confirm('Are you sure you want to remove this item?')) {
      this.removeItem(index);
    }
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
    this.cartItems = [...this.cartItems];
    this.calculateTotal();
  }

  saveForLater(index: number): void {
    const item = this.cartItems[index];
    this.savedItems.push(item);
    this.removeItem(index);
    alert(`${item.name} has been saved for later.`);
  }

  payNow(): void {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    alert(`Payment successful! You paid ₹${this.totalAmount.toFixed(2)}. Thank you!`);
  }
}
