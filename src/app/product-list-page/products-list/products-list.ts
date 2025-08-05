import { Component } from '@angular/core';
import { Productservice } from '../../services/productservice';
import { ProductListItem } from './product.types';
import { CurrencyPipe } from '@angular/common';
import { Rating } from '../../components/rating/rating';
import { Products } from '../../components/products/products';

@Component({
  selector: 'app-products-list',
  imports: [CurrencyPipe,Rating],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
  providers: [Productservice]
})
export class ProductsList {
  products: ProductListItem[] = [];


  constructor(productService: Productservice) {
    this.products = productService.getProductList();
  }

  addToCart(product: Products): void {
    
  }
}
