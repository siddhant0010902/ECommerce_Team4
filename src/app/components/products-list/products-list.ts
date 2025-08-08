import { Component } from '@angular/core';
import { Productservice } from '../../services/productservice';
import { ProductListItem } from '../../models/product.types';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Rating } from '../rating/rating';
import { Router } from '@angular/router';
import { cartService } from '../../services/cart-Service'; // <-- Import the new service

@Component({
  selector: 'app-products-list',
  standalone: true,
  templateUrl: './products-list.html',
  styleUrls: ['./products-list.css'],
  imports: [CurrencyPipe, Rating, FormsModule, CommonModule],
  providers: [Productservice]
})
export class ProductsList {
  products: ProductListItem[] = [];
  filteredProducts: ProductListItem[] = [];

  searchTerm: string = '';
  selectedCollection: string = 'All';
  selectedType: string = 'All';
  selectedGender: string = 'All';

  collections: string[] = ['All', 'New Arrivals', 'Sale', 'Deal of the Day', 'Best Seller'];
  types: string[] = ['All', 'Shirts', 'T-Shirts', 'Trousers', 'Accessories'];
  genders: string[] = ['All', 'Men', 'Women'];

  // Inject the Router and the new cartService
  constructor(private productService: Productservice, private router: Router, private cartService: cartService) {
    this.products = this.productService.getProductList();
    this.filteredProducts = [...this.products];
  }

  // This method adds a product to the cart and navigates to the cart page
  onProductClick(product: ProductListItem): void {
    this.cartService.addToCart(product);
    this.router.navigate(['home/cart']); // Navigate to the cart component's route
  }

  onSearch(): void {
    this.applyFilters();
  }

  onCollectionChange(collection: string): void {
    this.selectedCollection = collection;
    this.applyFilters();
  }

  onTypeChange(type: string): void {
    this.selectedType = type;
    this.applyFilters();
  }

  onGenderChange(gender: string): void {
    this.selectedGender = gender;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCollection = this.selectedCollection === 'All' || product.collection === this.selectedCollection;
      const matchesType = this.selectedType === 'All' || product.type === this.selectedType;
      const matchesGender = this.selectedGender === 'All' || product.gender === this.selectedGender;
      return matchesSearch && matchesCollection && matchesType && matchesGender;
    });
  }

  // The original `addToCart` method is no longer needed.

  trackByProduct(index: number, product: ProductListItem): String {
    return product.id;
  }
}
