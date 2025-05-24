import {Component} from '@angular/core';
import {NavbarComponent} from './components/navbar/navbar.component';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NotificationComponent} from './components/notification/notification.component';

@Component({
  selector: 'isard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    NavbarComponent,
    RouterOutlet,
    CommonModule,
    NotificationComponent,
  ]
})
export class AppComponent {}
