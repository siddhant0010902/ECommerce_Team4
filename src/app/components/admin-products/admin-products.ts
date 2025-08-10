import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductInventoryService, Product } from '../../services/product-inventory.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css'
})
export class AdminProducts implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm = '';
  selectedCategory = '';
  selectedStatus = '';
  showAddForm = false;
  showEditForm = false;
  editingProduct: Product | null = null;
  newProduct: Omit<Product, 'id' | 'createdAt'> = {
    name: '',
    category: '',
    brand: '',
    price: 0,
    stock: 0,
    description: '',
    image: '',
    status: 'Active'
  };
  categories = ['T-Shirts', 'Jeans', 'Dresses', 'Shoes', 'Accessories'];

  constructor(private productService: ProductInventoryService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch =
        !this.searchTerm ||
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (product.brand && product.brand.toLowerCase().includes(this.searchTerm.toLowerCase()));
      const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory;
      const matchesStatus = !this.selectedStatus || product.status === this.selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }

  addProduct() {
    if (this.newProduct.name && this.newProduct.category && this.newProduct.price > 0) {
      this.productService.addProduct(this.newProduct).subscribe(() => {
        this.productService.getProducts().subscribe(products => {
          this.products = products;
          this.applyFilters();
        });
        this.resetForm();
        this.showAddForm = false;
      });
    }
  }

  editProduct(product: Product) {
    this.editingProduct = { ...product };
    this.showEditForm = true;
  }

  updateProduct() {
    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct.id, this.editingProduct).subscribe(() => {
        this.productService.getProducts().subscribe(products => {
          this.products = products;
          this.applyFilters();
        });
        this.showEditForm = false;
        this.editingProduct = null;
      });
    }
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.productService.getProducts().subscribe(products => {
          this.products = products;
          this.applyFilters();
        });
      });
    }
  }

  resetForm() {
    this.newProduct = {
      name: '',
      category: '',
      brand: '',
      price: 0,
      stock: 0,
      description: '',
      image: '',
      status: 'Active'
    };
  }

  cancelEdit() {
    this.showEditForm = false;
    this.editingProduct = null;
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://via.placeholder.com/48x48?text=No+Image';
  }
}
