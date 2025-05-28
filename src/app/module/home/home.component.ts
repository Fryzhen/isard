import {Component} from '@angular/core';
import {NotificationService} from '../../services/app-services/notification.service';

@Component({
  selector: 'isard-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private notificationService: NotificationService,
  ) {
  }

  onClick() {
    this.notificationService.success('Welcome to ISARD!');
  }
}
