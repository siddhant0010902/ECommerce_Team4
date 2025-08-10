import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { cartService } from '../../services/cart-Service';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { ProductListItem } from '../../models/product.types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, Header, Footer],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: ProductListItem[] = [];
  savedItems: any[] = [];
  couponCode: string = '';
  appliedDiscount: number = 0;
  totalAmount: number = 0;

  // 🐛 FIX: Declare cartSubscription as a class property, not a constructor parameter.
  cartSubscription!: Subscription;

  // 🐛 FIX: Remove Subscription from the constructor
  constructor(private cartService: cartService) { }

  ngOnInit(): void {
    // 🐛 FIX: Assign the subscription result to the class property.
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks when the component is destroyed.
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  changeQuantity(index: number, delta: number): void {
    const item = this.cartItems[index];
    const newQty = (item.quantity ?? 0) + delta;

    if (newQty >= 1 && newQty <= 5) {
      this.cartService.updateQuantity(index, delta);
    } else if (newQty > 5) {
      alert('Maximum quantity allowed is 5.');
    }
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce(
      (sum, item) => sum + (item.price * (item.quantity || 1)),
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
        (sum, item) => sum + (item.price * (item.quantity || 1)),
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
    this.cartService.removeItem(index);
    this.calculateTotal();
  }

  saveForLater(index: number): void {
    const item = this.cartItems[index];
    this.savedItems.push(item);
    this.cartService.removeItem(index);
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
