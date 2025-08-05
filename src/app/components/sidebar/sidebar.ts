import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../services/sidebar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  @HostBinding('class.collapsed') get collapsed() { return this.isCollapsed; }
  private subscription: Subscription = new Subscription();

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.subscription.add(
      this.sidebarService.sidebarCollapsed$.subscribe(collapsed => {
        this.isCollapsed = collapsed;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
