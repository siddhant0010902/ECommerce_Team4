import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  joinDate: Date;
  totalOrders: number;
  totalSpent: number;
}

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.html',
  styleUrls: ['./customers.scss']
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  searchTerm: string = '';
  selectedStatus: string = '';
  
  // Menu state
  activeCustomerId: number | null = null;
  
  constructor() {}

  ngOnInit() {
    // Mock data for customers
    this.customers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        status: 'Active',
        joinDate: new Date('2023-01-15'),
        totalOrders: 12,
        totalSpent: 2450
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+1 (555) 987-6543',
        status: 'Active',
        joinDate: new Date('2023-02-20'),
        totalOrders: 8,
        totalSpent: 1680
      },
      {
        id: 3,
        name: 'Robert Johnson',
        email: 'robert.j@example.com',
        phone: '+1 (555) 456-7890',
        status: 'Inactive',
        joinDate: new Date('2023-03-10'),
        totalOrders: 3,
        totalSpent: 520
      },
      {
        id: 4,
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        phone: '+1 (555) 234-5678',
        status: 'Active',
        joinDate: new Date('2023-04-05'),
        totalOrders: 15,
        totalSpent: 3200
      },
      {
        id: 5,
        name: 'Michael Wilson',
        email: 'michael.w@example.com',
        phone: '+1 (555) 876-5432',
        status: 'Inactive',
        joinDate: new Date('2023-05-12'),
        totalOrders: 5,
        totalSpent: 950
      }
    ];
    
    this.filteredCustomers = [...this.customers];
  }
  
  applyFilters() {
    this.filteredCustomers = this.customers.filter(customer => {
      const matchesSearch = !this.searchTerm || 
        customer.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        customer.phone.includes(this.searchTerm);
      
      const matchesStatus = !this.selectedStatus || 
        customer.status === this.selectedStatus;
      
      return matchesSearch && matchesStatus;
    });
  }
  
  clearFilters() {
    this.searchTerm = '';
    this.selectedStatus = '';
    this.filteredCustomers = [...this.customers];
  }
  
  toggleMenu(customerId: number) {
    if (this.activeCustomerId === customerId) {
      this.activeCustomerId = null;
    } else {
      this.activeCustomerId = customerId;
    }
  }
  
  viewCustomerDetails(customerId: number) {
    console.log(`View details for customer ${customerId}`);
    this.activeCustomerId = null;
  }
  
  editCustomer(customerId: number) {
    console.log(`Edit customer ${customerId}`);
    this.activeCustomerId = null;
  }
  
  deleteCustomer(customerId: number) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customers = this.customers.filter(c => c.id !== customerId);
      this.filteredCustomers = this.filteredCustomers.filter(c => c.id !== customerId);
      console.log(`Deleted customer ${customerId}`);
    }
    this.activeCustomerId = null;
  }
  
  formatCurrency(amount: number): string {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
  
  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}