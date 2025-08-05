import { Component } from '@angular/core';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  isRead: boolean;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [],
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.scss']
})
export class NotificationsComponent {
  notifications: Notification[] = [
    {
      id: 1,
      title: 'New Order Received',
      message: 'Order #1234 has been placed by John Doe',
      type: 'success',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      isRead: false
    },
    {
      id: 2,
      title: 'Low Stock Alert',
      message: 'Product "T-Shirt" is running low on stock (5 items remaining)',
      type: 'warning',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      isRead: false
    },
    {
      id: 3,
      title: 'System Update',
      message: 'Dashboard has been updated with new features',
      type: 'info',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isRead: true
    },
    {
      id: 4,
      title: 'Payment Failed',
      message: 'Payment for order #1230 has failed. Please review.',
      type: 'error',
      timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      isRead: false
    }
  ];

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }

  markAsRead(notification: Notification) {
    notification.isRead = true;
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.isRead = true);
  }

  deleteNotification(id: number) {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  getTypeIcon(type: string): string {
    switch (type) {
      case 'success': return 'check_circle';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'info';
    }
  }

  getTypeColor(type: string): string {
    switch (type) {
      case 'success': return 'primary';
      case 'warning': return 'warn';
      case 'error': return 'warn';
      default: return 'accent';
    }
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  }
}
