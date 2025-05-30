import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {INotification, NotificationService, NotificationType} from '../../services/app-services/notification.service';
import {debounceTime, tap} from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'isard-notification',
  templateUrl: './notification.component.html',
  imports: [
    CommonModule,
  ],
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  showNotification = false;

  notification: INotification = {
    message: '',
    type: NotificationType.Error,
  };

  constructor(
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.notificationService.notifyRequest$
      .pipe(
        tap((notification: INotification) => {
          this.notification = notification;
          this.showNotification = true;
        }),
        debounceTime(3000),
        tap(() => {
          this.showNotification = false;
        })
      )
      .subscribe();
  }
}
