import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AdminSidebar
],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
  activeSection = 'dashboard';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Set active section based on current route
    this.route.url.subscribe(segments => {
      if (segments.length > 0) {
        this.activeSection = segments[0].path;
      }
    });
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }
}
