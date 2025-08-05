import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [CommonModule,RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  open = false;

  constructor(public router: Router) {}

  
openSearchBox() {
    this.open = true;
  }

  closeSearchBox() {
    this.open = false;
  }

}