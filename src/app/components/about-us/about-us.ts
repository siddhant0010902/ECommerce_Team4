import { Component } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-about-us',
  imports: [Header, Footer],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css'
})
export class AboutUs {
     
}
