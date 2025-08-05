import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../services/product';
import { ProductDialogComponent } from '../product-dialog/product-dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, ProductDialogComponent],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  
  // Filter properties
  searchTerm: string = '';
  selectedCategory: string = '';
  selectedStatus: string = '';
  
  categories: string[] = ['T-Shirts', 'Jeans', 'Dresses', 'Shoes', 'Accessories'];
  statuses: string[] = ['Active', 'Inactive', 'Out of Stock'];
  
  // Dialog state
  isDialogOpen: boolean = false;
  editingProduct: Product | null = null;
  
  private subscription: Subscription = new Subscription();

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadProducts() {
    this.subscription.add(
      this.productService.getProducts().subscribe(products => {
        this.products = products;
        this.filteredProducts = products;
      })
    );
  }

  openAddProductDialog() {
    this.editingProduct = null;
    this.isDialogOpen = true;
  }

  openEditProductDialog(product: Product) {
    this.editingProduct = product;
    this.isDialogOpen = true;
  }

  onDialogClose() {
    this.isDialogOpen = false;
    this.editingProduct = null;
  }

  onProductSave(product: Product) {
    if (this.editingProduct) {
      // Update existing product
      this.productService.updateProduct(product.id, product).subscribe(updatedProduct => {
        if (updatedProduct) {
          this.loadProducts();
        }
      });
    } else {
      // Add new product (exclude id from the product)
      const { id, ...productWithoutId } = product;
      this.productService.addProduct(productWithoutId).subscribe(newProduct => {
        if (newProduct) {
          this.loadProducts();
        }
      });
    }
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = !this.searchTerm || 
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (product as any).brand?.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || 
        product.category === this.selectedCategory;
      
      const matchesStatus = !this.selectedStatus || 
        product.status === this.selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedStatus = '';
    this.filteredProducts = this.products;
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(success => {
        if (success) {
          this.loadProducts();
        }
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  onImageError(event: any) {
    event.target.src = 'https://via.placeholder.com/48x48/000000/ffffff?text=IMG';
  }
}
