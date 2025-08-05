import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService, Product } from '../services/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  stats = [
    { title: 'Total Products', value: '0', icon: 'shopping_cart' },
    { title: 'Total Sales', value: '₹0', icon: 'attach_money' },
    { title: 'Active Products', value: '0', icon: 'trending_up' },
    { title: 'Total Customers', value: '0', icon: 'people' }
  ];

  private subscription: Subscription = new Subscription();

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadStatistics();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadStatistics() {
    this.subscription.add(
      this.productService.getProducts().subscribe(products => {
        const totalProducts = products.length;
        const activeProducts = products.filter(p => p.status === 'Active').length;
        const totalSales = products.reduce((sum, p) => sum + p.price, 0);

        this.stats[0].value = totalProducts.toString();
        this.stats[1].value = `₹${totalSales.toLocaleString('en-IN')}`;
        this.stats[2].value = activeProducts.toString();
        this.stats[3].value = '1,234'; // Mock customer count
      })
    );
  }
}
