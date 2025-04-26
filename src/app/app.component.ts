import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';

@Component({
  selector: 'isard-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, NavbarComponent],
  styleUrls: ['./app.component.scss'], // Corrected property name
  standalone: true,
})
export class AppComponent {}
