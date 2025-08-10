import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard-overview.html',
  styleUrl: './admin-dashboard-overview.css'
})
export class AdminDashboardOverview {
  stats = [
    { title: 'Total Sales', value: '₹45,230', change: '+12.5%', icon: '💰', color: 'bg-green-500' },
    { title: 'Total Orders', value: '1,234', change: '+8.2%', icon: '📦', color: 'bg-blue-500' },
    { title: 'Total Customers', value: '856', change: '+15.3%', icon: '👥', color: 'bg-purple-500' },
    { title: 'Total Products', value: '234', change: '+5.7%', icon: '🏷️', color: 'bg-orange-500' }
  ];

  recentOrders = [
    { id: '#1234', customer: 'John Doe', product: 'Premium T-Shirt', amount: '₹1,299', status: 'Delivered' },
    { id: '#1235', customer: 'Jane Smith', product: 'Designer Jeans', amount: '₹2,499', status: 'Processing' },
    { id: '#1236', customer: 'Mike Johnson', product: 'Casual Shoes', amount: '₹1,899', status: 'Shipped' },
    { id: '#1237', customer: 'Sarah Wilson', product: 'Summer Dress', amount: '₹1,599', status: 'Pending' }
  ];

  topProducts = [
    { name: 'Premium T-Shirt', sales: 156, revenue: '₹2,02,800' },
    { name: 'Designer Jeans', sales: 89, revenue: '₹2,22,411' },
    { name: 'Casual Shoes', sales: 67, revenue: '₹1,27,233' },
    { name: 'Summer Dress', sales: 45, revenue: '₹71,955' }
  ];
}
