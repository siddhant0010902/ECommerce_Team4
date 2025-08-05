import { Component } from '@angular/core';
import { ProductsList } from "../product-list-page/products-list/products-list";
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';

@Component({
  selector: 'app-product-page',
  imports: [ProductsList,Header,Footer],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css'
})
export class ProductPage {

}
