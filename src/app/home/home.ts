import { Component } from '@angular/core';
import { Navbar } from "../components/navbar/navbar";
import { Body } from "../components/body/body";
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import { ProductGrid } from '../components/body/product-grid/product-grid';
import { Products } from '../components/products/products';
import { ProductsList } from '../product-list-page/products-list/products-list';

@Component({
  selector: 'app-home',
  imports: [Navbar, Body,Header,Footer,ProductGrid],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
