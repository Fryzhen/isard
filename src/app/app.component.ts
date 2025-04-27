import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';
import {NgForOf} from '@angular/common';
import {NotificationService} from './services/notification.service';
import {NotificationComponent} from './components/notification/notification.component';
import {Notification} from './components/notification/notification.component';

@Component({
  selector: 'isard-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, NavbarComponent, NgForOf, NotificationComponent],
  styleUrls: ['./app.component.scss'], // Corrected property name
  standalone: true,
})
export class AppComponent {

  constructor(
    private notificationService: NotificationService,
  ) {}

  getNotifications(): Notification[] {
    return this.notificationService.getNotifications();
  }
}
