import {ReplaySubject} from 'rxjs';
import {Injectable} from '@angular/core';

export interface INotification {
  message: string,
  type: NotificationType,
}

export enum NotificationType {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifyRequest = new ReplaySubject<INotification>();

  notifyRequest$ = this.notifyRequest.asObservable();

  public success(message: string) {
    this.notify(message, NotificationType.Success);
  }

  public warning(message: string) {
    this.notify(message, NotificationType.Warning);
  }

  public error(message: string) {
    this.notify(message, NotificationType.Error);
  }

  private notify(message: string, type: NotificationType) {
    this.notifyRequest.next({
      message: message,
      type: type,
    } as INotification);
  }
}
