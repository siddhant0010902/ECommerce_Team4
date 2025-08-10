import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isCollapsed = false;
  private _isMobile = false;
  
  // Callbacks that components can hook into to listen for changes
  public onStateChange: (isCollapsed: boolean) => void = () => {};
  public onMobileChange: (isMobile: boolean) => void = () => {};

  constructor() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  private checkScreenSize(): void {
    const mobile = window.innerWidth <= 768;
    if (this._isMobile !== mobile) {
      this._isMobile = mobile;
      this.onMobileChange(this._isMobile); // Notify listeners of mobile state change
    }
    
    // Auto-collapse on mobile if it's not already collapsed
    if (this._isMobile && !this.isCollapsed) {
      this.collapseSidebar();
    }
  }

  /**
   * Toggles the collapsed state of the sidebar and notifies listeners.
   */
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    this.onStateChange(this.isCollapsed); // Notify listeners of the new state
  }

  /**
   * Collapses the sidebar if it is currently expanded and notifies listeners.
   */
  collapseSidebar(): void {
    if (!this.isCollapsed) {
      this.isCollapsed = true;
      this.onStateChange(this.isCollapsed); // Notify listeners of the new state
    }
  }

  /**
   * Expands the sidebar if it is currently collapsed and notifies listeners.
   */
  expandSidebar(): void {
    if (this.isCollapsed) {
      this.isCollapsed = false;
      this.onStateChange(this.isCollapsed); // Notify listeners of the new state
    }
  }

  /**
   * Returns the current collapsed state of the sidebar.
   * @returns {boolean} - True if the sidebar is collapsed, false otherwise.
   */
  getSidebarState(): boolean {
    return this.isCollapsed;
  }

  /**
   * Returns whether the application is currently in a mobile view.
   * @returns {boolean} - True if the screen width is mobile, false otherwise.
   */
  isMobile(): boolean {
    return this._isMobile;
  }
}