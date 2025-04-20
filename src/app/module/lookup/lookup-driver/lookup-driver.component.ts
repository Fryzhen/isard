import {Component} from '@angular/core';
import {LookupService} from '../../../services/lookup.service';
import {Driver} from '../../../entities/Member';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'isard-lookup-driver',
  templateUrl: './lookup-driver.component.html',
  styleUrls: ['./lookup-driver.component.scss'],
  imports: [
    NgIf,
    NgForOf
  ],
})
export class LookupDriverComponent {
  drivers: Driver[];
  private debounceTimeout: number; // Variable pour stocker l'identifiant du timeout

  constructor(private lookupService: LookupService) {
    this.drivers = [];
    this.debounceTimeout = 0; // Initialisation du timeout
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    if (inputElement.value.length >= 3) {
      this.debounceTimeout = setTimeout(() => {
        this.lookupService.getLookupDrivers(inputElement.value).then((drivers) => {
          console.log('Drivers:', drivers); // Log the response
          this.drivers = drivers;
        }).catch((error) => {
          console.error('Error fetching drivers:', error); // Log any errors
        });
      }, 500); // Délai de 0,5 seconde
    }
  }
}
