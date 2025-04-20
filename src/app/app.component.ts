import { Component } from '@angular/core';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'isard-root',
  templateUrl: './app.component.html',
  imports: [NavigationComponent, RouterOutlet],
  styleUrls: ['./app.component.scss'], // Corrected property name
})
export class AppComponent {}
