import {Component, OnInit} from '@angular/core';
import {NavigationComponent} from './components/navigation/navigation.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'isard-root',
  templateUrl: './app.component.html',
  imports: [
    NavigationComponent,
    RouterOutlet
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor() {
  }

  public ngOnInit() {}

}
