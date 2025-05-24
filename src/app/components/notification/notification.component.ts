import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'warning';
}

@Component({
  selector: 'isard-notification',
  templateUrl: './notification.component.html',
  imports: [
    CommonModule,
  ],
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() notification!: Notification;
  visible: boolean = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.dismiss()
    }, 5000);
  }

  dismiss(): void {
    this.visible = false; // Hide on click
  }
}
