 import { Injectable } from '@angular/core';
 import { products } from '../components/products-list/products.data';


 export class Productservice {


   getProductList() {
     return products;
   }

}
