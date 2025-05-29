// src/app/module/home/home.component.ts
import {Component} from '@angular/core';
import {BackgroundComponent} from '../../components/background/background.component';

@Component({
  selector: 'isard-home',
  templateUrl: './home.component.html',
  imports: [BackgroundComponent],
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  images = [
    './assets/background/double-ferrari.jpg',
    './assets/background/inside-ir18.jpg',
    './assets/background/nascar-drift.jpg',
    './assets/background/w12-sunset.jpg',
    './assets/background/nascar-race.jpg',
  ];

  constructor() {
  }
}
