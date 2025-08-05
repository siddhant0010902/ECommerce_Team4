import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-grid',
  imports: [CommonModule],
  templateUrl: './product-grid.html',
  styleUrl: './product-grid.css'
})
export class ProductGrid {
products = [
    {
      image: 'assets/images/product1.avif',
      link : 'http://localhost:4200/products'
      
    },
    {
      image: 'assets/images/product2.avif',
      link : 'http://localhost:4200/products'
    },
    {
      image: 'assets/images/product3.avif',
      link : 'http://localhost:4200/products'
    },
    {
      image: 'assets/images/product4.avif',
      link : 'http://localhost:4200/products'
    },
    {
      image: 'assets/images/product5.avif',
      link : 'http://localhost:4200/products'
    },
    {
      image: 'assets/images/product6.avif',
      link : 'http://localhost:4200/products'
    },
    {
      image: 'assets/images/product7.avif',
      link : 'http://localhost:4200/products'
    },
    {
      image: 'assets/images/product8.avif',
      link : 'http://localhost:4200/products'
    },
    {
      image: 'assets/images/product9.avif',
      link : 'http://localhost:4200/products'
    },
    {
      image: 'assets/images/product10.avif', 
      link : 'http://localhost:4200/products'
    },
    {
      image: 'assets/images/product11.avif',
      link : 'http://localhost:4200/products'
    },
    {
      image: 'assets/images/product13.avif',
      link : 'http://localhost:4200/products'
    }
  ] 
}


