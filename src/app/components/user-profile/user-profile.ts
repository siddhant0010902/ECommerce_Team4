import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, Header, Footer],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user: User = {
    username: '',
    email: '',
    phone: '',
    gender: 'male',
    password: ''
  };

  private userSubscription?: Subscription;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.currentUser$.subscribe({
      next: (userData) => {
        if (userData) {
          this.user = { ...userData };
        }
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  onSubmit(): void {
    if (this.user) {
      this.userService.updateCurrentUser(this.user);
      alert('✅ Profile updated successfully!');
    }
  }
}
