import {Component, inject} from "@angular/core";
import {Router} from "@angular/router";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {SearchPicklistComponent} from "../../input/search-picklist/search-picklist.component";
import {LookupService} from "../../../services/request-services/lookup.service";
import {NotificationService} from "../../../services/app-services/notification.service";
import {LoggerService} from "../../../services/app-services/logger.service";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {LanguageComponent} from "../language/language.component";
import {Driver} from "../../../services/iracing-entities";

@Component({
  standalone: true,
  selector: "isard-navbar",
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss",
  imports: [CommonModule, NgOptimizedImage, SearchPicklistComponent, TranslatePipe, LanguageComponent]
})
export class NavbarComponent {
  drivers: Driver[] = [];
  private readonly router = inject(Router);
  private readonly lookupService = inject(LookupService);
  private readonly notificationService = inject(NotificationService);
  private readonly loggerService = inject(LoggerService);
  private readonly translateService = inject(TranslateService);

  redirectTo(route: string[]) {
    return this.router.navigate(route).then(() => {
      window.location.reload();
    });
  }

  onSearch(searchTerm: string): void {
    if (searchTerm !== "") {
      this.lookupService.getDrivers(searchTerm).subscribe({
        next: (drivers: Driver[]) => {
          this.drivers = drivers;
        }, error: (error: Error) => {
          this.loggerService.error(error.message);
          this.notificationService.error(this.translateService.instant("Components.Navbar.ErrorFailLoad"));
        }
      });
    } else {
      this.drivers = [];
    }
  }

  driversToItems(drivers: Driver[]) {
    return drivers.map(driver => ({
      name: driver.display_name, id: driver.cust_id
    }));
  }

  onItemClick(itemId: number): void {
    this.redirectTo([`/member/${itemId}`]).then(() => {
      this.drivers = [];
    });
  }
}
