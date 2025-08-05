import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../services/product';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-dialog.html',
  styles: [`
    @keyframes dialogOpen {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    
    .animate-dialog-open {
      animation: dialogOpen 0.3s ease-out forwards;
    }
  `]
})
export class ProductDialogComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() product: Product | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Product>();

  isEditMode: boolean = false;
  formData: any = {
    name: '',
    description: '',
    category: '',
    brand: '',
    price: 0,
    stock: 0,
    status: 'Active',
    image: ''
  };

  ngOnInit() {
    this.isEditMode = !!this.product;
    if (this.product) {
      this.formData = { ...this.product };
    } else {
      this.resetForm();
    }
  }

  resetForm() {
    this.formData = {
      name: '',
      description: '',
      category: '',
      brand: '',
      price: 0,
      stock: 0,
      status: 'Active',
      image: ''
    };
  }

  onSubmit() {
    if (this.isFormValid()) {
      const productData: Product = {
        ...this.formData,
        id: this.product?.id || Date.now(), // Simple ID generation for demo
        price: Number(this.formData.price),
        stock: Number(this.formData.stock)
      };
      
      this.save.emit(productData);
      this.onClose();
    }
  }

  onClose() {
    this.close.emit();
    this.resetForm();
  }

  onOverlayClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  private isFormValid(): boolean {
    return !!(
      this.formData.name?.trim() &&
      this.formData.category &&
      this.formData.price >= 0 &&
      this.formData.stock >= 0 &&
      this.formData.status
    );
  }
}
