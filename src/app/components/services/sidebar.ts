import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarCollapsedSubject = new BehaviorSubject<boolean>(false);
  private isMobileSubject = new BehaviorSubject<boolean>(false);
  
  public sidebarCollapsed$: Observable<boolean> = this.sidebarCollapsedSubject.asObservable();
  public isMobile$: Observable<boolean> = this.isMobileSubject.asObservable();

  constructor() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  private checkScreenSize(): void {
    const isMobile = window.innerWidth <= 768;
    this.isMobileSubject.next(isMobile);
    
    // Auto-collapse on mobile
    if (isMobile && !this.sidebarCollapsedSubject.value) {
      this.collapseSidebar();
    }
  }

  toggleSidebar(): void {
    const currentState = this.sidebarCollapsedSubject.value;
    this.sidebarCollapsedSubject.next(!currentState);
  }

  collapseSidebar(): void {
    this.sidebarCollapsedSubject.next(true);
  }

  expandSidebar(): void {
    this.sidebarCollapsedSubject.next(false);
  }

  getSidebarState(): boolean {
    return this.sidebarCollapsedSubject.value;
  }

  isMobile(): boolean {
    return this.isMobileSubject.value;
  }
}
