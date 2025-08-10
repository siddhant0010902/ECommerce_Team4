import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './adminlogin.html'
})
export class Adminlogin {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      adminId: ['admin', [Validators.required, Validators.minLength(3)]],
      password: ['admin123', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { adminId, password } = this.loginForm.value;
      
      // Simple validation for demo purposes
      if (adminId === 'admin' && password === 'admin123') {
        console.log('Login successful:', this.loginForm.value);
        this.router.navigate(['/admin/dashboard']);
      } else {
        alert('Invalid Admin ID or Password. Use admin/admin123 for demo.');
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  signInWithGoogle() {
    console.log('Google sign-in clicked');
    this.router.navigate(['/admin/dashboard']);
  }

  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }
}
