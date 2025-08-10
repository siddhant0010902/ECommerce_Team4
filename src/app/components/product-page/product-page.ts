import { Component } from '@angular/core';

import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ProductsList } from '../products-list/products-list';

@Component({
  selector: 'app-product-page',
  imports: [ProductsList,Header,Footer],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css'
})
export class ProductPage {

}
