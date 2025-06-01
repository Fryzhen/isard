import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {PicklistComponent} from '../picklist/picklist.component';
import {Driver} from '../../services/request-services/iracing-entities';
import {LookupService} from '../../services/request-services/lookup.service';
import {NotificationService} from '../../services/app-services/notification.service';
import {LoggerService} from '../../services/app-services/logger.service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {LanguageComponent} from '../language/language.component';

@Component({
  standalone: true,
  selector: 'isard-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [
    CommonModule,
    NgOptimizedImage,
    PicklistComponent,
    TranslatePipe,
    LanguageComponent
  ]
})
export class NavbarComponent {
  drivers: Driver[] = [];

  constructor(
    private router: Router,
    private lookupService: LookupService,
    private notificationService: NotificationService,
    private loggerService: LoggerService,
    private translateService: TranslateService,
  ) {
  }

  redirectTo(route: string[]): Promise<boolean> {
    return this.router.navigate(route);
  }

  onSearch(searchTerm: string): void {
    if (searchTerm !== '') {
      this.lookupService.getLookupDrivers(searchTerm).subscribe({
        next: (drivers: Driver[]) => {
          this.drivers = drivers;
        },
        error: (error: Error) => {
          this.loggerService.error(error.message);
          this.translateService.get('Components.NavBar.ErrorFailLoad').subscribe((text: string) => {
            this.notificationService.error(text);
          });
        }
      });
    } else {
      this.drivers = [];
    }
  }

  driversToItems(drivers: Driver[]) {
    return drivers.map(driver => ({
      name: driver.display_name,
      id: driver.cust_id
    }));
  }

  onItemClick(itemId: number): void {
    this.redirectTo([`/member/${itemId}`]).then((success: boolean) => {
      if (success) {
        this.drivers = [];
      } else {
        this.translateService.get('Components.Navbar.ErrorFailNavigate').subscribe((text: string) => {
          this.notificationService.error(text);
        });
      }
    })
  }
}
