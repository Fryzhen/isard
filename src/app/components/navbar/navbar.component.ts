import {Component} from '@angular/core';
import {LookupService} from '../../services/lookup.service';
import {Router} from '@angular/router';
import {Driver} from '../../entities/driver/Member';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'isard-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [
    CommonModule,
  ]
})
export class NavbarComponent {
  drivers: Driver[] = [];
  private debounceTimeout = 0;

  constructor(
    private lookupService: LookupService,
    private router: Router
  ) {}

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    if (inputElement.value.length >= 1) {
      this.debounceTimeout = setTimeout(() => {
        this.lookupService.getLookupDrivers(inputElement.value).subscribe({
          next: (drivers: Driver[]) => {
            console.log('Drivers:', drivers); // Log the response
            this.drivers = drivers;
          },
          error: (error: Error) => {
            console.error('Error fetching drivers:', error);
          }
        });
      }, 500);
    } else {
      this.drivers = [];
    }
  }

  onDriverSelect(driver: Driver): void {
    this.drivers = [];
    this.redirectTo(['/member', "" + driver.cust_id]);
  }

  redirectTo(route: string[]): void {
    this.router.navigate(route);
  }
}
