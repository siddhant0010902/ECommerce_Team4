import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarService } from '../services/sidebar';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.html',
  styleUrls: ['./topbar.scss']
})
export class TopbarComponent {
  adminUser = {
    name: 'Admin',
    email: 'admin@dummy.com',
    role: 'Administrator'
  };

   isProfileMenuOpen = false;

  constructor(private sidebarService: SidebarService, private router: Router) {}

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

    toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  showProfileMenu() {
    console.log('Profile menu clicked');
  }
  
  signOut() {
    // In a real app, you would clear authentication tokens/cookies here
    console.log('Signing out...');
    this.router.navigate(['/login']);
  }
}
