import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit, OnDestroy {
  open = false;
  currentUser: User | null = null;
  private userSub!: Subscription;

  constructor(public router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userSub = this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  // This function handles navigation to the user profile
  // It checks if a user is logged in and redirects accordingly
  navigateToProfile(): void {
    if (this.currentUser) {
      this.router.navigate(['/user-profile']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  openSearchBox() {
    this.open = true;
  }

  closeSearchBox() {
    this.open = false;
  }
}
