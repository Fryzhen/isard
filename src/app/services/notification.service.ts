import {Injectable} from '@angular/core';
import {Notification} from '../components/notification/notification.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications: Notification[] = [];

  constructor() {}

  addNotification(notification: Notification): void {
    this.notifications.push(notification);
  }

  getNotifications(): Notification[] {
    return this.notifications;
  }

  clearNotifications(): void {
    this.notifications = [];
  }
}
