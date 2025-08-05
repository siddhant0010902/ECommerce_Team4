import { Injectable } from '@angular/core';
import { products } from '../product-list-page/products-list/products.data';


export class Productservice {


  getProductList() {
    return products;
  }
  
}
