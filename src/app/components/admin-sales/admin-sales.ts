import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-sales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-sales.html',
  styleUrl: './admin-sales.css'
})
export class AdminSales {
  salesData = [
    { id: 1, orderId: '#1234', customer: 'John Doe', product: 'Premium T-Shirt', amount: 1299, date: '2024-01-15', status: 'Completed' },
    { id: 2, orderId: '#1235', customer: 'Jane Smith', product: 'Designer Jeans', amount: 2499, date: '2024-01-14', status: 'Completed' },
    { id: 3, orderId: '#1236', customer: 'Mike Johnson', product: 'Casual Shoes', amount: 1899, date: '2024-01-13', status: 'Processing' },
    { id: 4, orderId: '#1237', customer: 'Sarah Wilson', product: 'Summer Dress', amount: 1599, date: '2024-01-12', status: 'Completed' },
    { id: 5, orderId: '#1238', customer: 'David Brown', product: 'Sports Cap', amount: 599, date: '2024-01-11', status: 'Completed' },
    { id: 6, orderId: '#1239', customer: 'Emily Davis', product: 'Premium T-Shirt', amount: 1299, date: '2024-01-10', status: 'Completed' }
  ];

  salesStats = [
    { title: 'Total Sales', value: '₹45,230', change: '+12.5%', trend: 'up' },
    { title: 'Orders Today', value: '23', change: '+8.2%', trend: 'up' },
    { title: 'Average Order', value: '₹1,967', change: '+5.7%', trend: 'up' },
    { title: 'Conversion Rate', value: '3.2%', change: '-0.5%', trend: 'down' }
  ];

  monthlySales = [
    { month: 'Jan', sales: 45230 },
    { month: 'Feb', sales: 52340 },
    { month: 'Mar', sales: 48920 },
    { month: 'Apr', sales: 56780 },
    { month: 'May', sales: 61230 },
    { month: 'Jun', sales: 58940 }
  ];

  getTotalSales(): number {
    return this.salesData.reduce((total, sale) => total + sale.amount, 0);
  }

  getCompletedOrders(): number {
    return this.salesData.filter(sale => sale.status === 'Completed').length;
  }

  getAverageOrderValue(): number {
    const total = this.getTotalSales();
    return total / this.salesData.length;
  }
}
