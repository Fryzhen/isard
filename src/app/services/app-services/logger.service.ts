import {Injectable} from '@angular/core';
import {NotificationService} from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor(private notificationService: NotificationService) {
  }

  log(message: string, notify: boolean = false): void {
    console.log(`Log: ${message}`);
    if (notify) {
      this.notificationService.success(message);
    }
  }

  warn(message: string, notify: boolean = false): void {
    console.warn(`Warning: ${message}`);
    if (notify) {
      this.notificationService.warning(message);
    }
  }

  error(message: string, notify: boolean = false): void {
    console.error(`Error: ${message}`);
    if (notify) {
      this.notificationService.error(message);
    }
  }

  info(message: string, notify: boolean = false): void {
    console.info(`Info: ${message}`);
    if (notify) {
      this.notificationService.success(message);
    }
  }
}
