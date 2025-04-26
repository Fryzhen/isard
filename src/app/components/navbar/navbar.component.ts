import {Component} from '@angular/core';
import {LookupService} from '../../services/lookup.service';
import {Router} from '@angular/router';
import {NgForOf, NgIf, NgOptimizedImage, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Driver} from '../../entities/Member';

@Component({
  selector: 'isard-navbar',
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    NgStyle,
    NgOptimizedImage
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
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
        this.lookupService.getLookupDrivers(inputElement.value).then((drivers: Driver[]) => {
          console.log('Drivers:', drivers); // Log the response
          this.drivers = drivers;
        }).catch((error: Error) => {
          console.error('Error fetching drivers:', error); // Log any errors
        });
      }, 500); // Délai de 0,5 seconde
    }
  }

  onDriverSelect(driver: Driver): void {
    this.drivers = [];
    this.router.navigate(['/member', driver.cust_id]);
  }
}
