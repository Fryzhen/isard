import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {PicklistComponent} from '../picklist/picklist.component';

@Component({
  standalone: true,
  selector: 'isard-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [
    CommonModule,
    NgOptimizedImage,
    PicklistComponent,
  ]
})
export class NavbarComponent {

  constructor(
    private router: Router
  ) {
  }

  redirectTo(route: string[]): void {
    this.router.navigate(route).then();
  }
}
