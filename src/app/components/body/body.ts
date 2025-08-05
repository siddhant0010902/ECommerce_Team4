import { Component } from '@angular/core';
import { ProductGrid } from './product-grid/product-grid';
import { CurrencyPipe } from '@angular/common';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-body',
  imports: [CurrencyPipe],
  templateUrl: './body.html',
  styleUrl: './body.css'
})
export class Body {

}
