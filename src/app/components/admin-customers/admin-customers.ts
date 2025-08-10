import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-customers.html',
  styleUrl: './admin-customers.css'
})
export class AdminCustomers {
  customers = [
    { id: 1, name: 'John Smith', email: 'john50@outlook.com', phone: '+91 2604798005', status: 'Active', joinDate: 'Oct 21, 2024', orders: 8, totalSpent: 50826 },
    { id: 2, name: 'Emma Johnson', email: 'emma86@company.com', phone: '+91 5514228047', status: 'Active', joinDate: 'Jan 26, 2025', orders: 12, totalSpent: 144000 },
    { id: 3, name: 'Michael Brown', email: 'michael72@hotmail.com', phone: '+91 5371329442', status: 'Active', joinDate: 'Feb 14, 2025', orders: 14, totalSpent: 44400 },
    { id: 4, name: 'Olivia Davis', email: 'olivia17@gmail.com', phone: '+91 9409276532', status: 'Active', joinDate: 'Mar 27, 2025', orders: 17, totalSpent: 37096 },
    { id: 5, name: 'Sophia Lee', email: 'sophia.lee@mail.com', phone: '+91 9876543210', status: 'Inactive', joinDate: 'Apr 10, 2025', orders: 5, totalSpent: 12000 }
  ];

  showActionsIndex: number | null = null;

  showActions(idx: number) {
    this.showActionsIndex = idx;
  }

  hideActions() {
    this.showActionsIndex = null;
  }

  viewDetails(customer: any) {
    alert('View details for ' + customer.name);
  }

  editCustomer(customer: any) {
    alert('Edit customer: ' + customer.name);
  }

  deleteCustomer(customer: any) {
    if (confirm('Delete customer: ' + customer.name + '?')) {
      this.customers = this.customers.filter(c => c.id !== customer.id);
    }
  }
}
