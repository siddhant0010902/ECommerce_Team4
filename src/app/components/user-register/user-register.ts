import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './user-register.html',
  styleUrl: './user-register.css'
})
export class UserRegister {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const newUser: User = {
        username: this.registrationForm.value.username,
               phone: this.registrationForm.value.phone,
        gender: this.registrationForm.value.gender,
        password: this.registrationForm.value.password,
        email: this.registrationForm.value.email,
      };

      this.userService.register(newUser); // ✅ Store user in service
      console.log('✅ Registration Successful:', newUser);
      alert('🎉 Registration Successful!');
      this.router.navigate(['/login']); // ✅ Redirect to login
    } else {
      this.markFormGroupTouched();
      this.logValidationErrors();
      alert('⚠️ Please fix the errors before submitting.');
    }
  }

  private markFormGroupTouched() {
    Object.values(this.registrationForm.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });
  }

  private logValidationErrors() {
    console.log('Form Errors:', this.registrationForm.errors);
    Object.keys(this.registrationForm.controls).forEach(key => {
      const controlErrors = this.registrationForm.get(key)?.errors;
      if (controlErrors) {
        console.log(`${key} errors:`, controlErrors);
      }
    });
  }
  get f() {
    return this.registrationForm.controls;
  }
}
