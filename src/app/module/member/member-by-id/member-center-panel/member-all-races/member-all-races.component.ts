import {Component, inject, Input, OnChanges, SimpleChanges} from "@angular/core";
import {BoxComponent} from "../../../../../components/cosmetics/box/box.component";
import {LoadingScreenComponent} from "../../../../../components/cosmetics/loading-screen/loading-screen.component";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {ResultsService} from "../../../../../services/request-services/results.service";
import {SearchSeries} from "../../../../../services/iracing-entities";
import {DividerComponent} from "../../../../../components/cosmetics/divider/divider.component";
import {
  MemberAllRacesParameters,
  MemberAllRacesParametersComponent
} from "./member-all-races-parameters/member-all-races-parameters.component";
import {MemberAllRacesResultsComponent} from "./member-all-races-results/member-all-races-results.component";
import {MemberAllRacesFilterComponent} from "./member-all-races-filter/member-all-races-filter.component";
import {LoggerService} from "../../../../../services/app-services/logger.service";
import {NotificationService} from "../../../../../services/app-services/notification.service";

@Component({
  standalone: true,
  selector: "isard-member-all-races",
  imports: [BoxComponent, LoadingScreenComponent, TranslatePipe, DividerComponent, MemberAllRacesParametersComponent, MemberAllRacesResultsComponent, MemberAllRacesFilterComponent],
  templateUrl: "./member-all-races.component.html",
  styleUrl: "./member-all-races.component.scss"
})
export class MemberAllRacesComponent implements OnChanges {
  @Input() custId!: number;
  series?: SearchSeries[] = undefined;
  loadingSeries = false;
  filteredSeries?: SearchSeries[] = undefined;
  private readonly resultService = inject(ResultsService);
  private readonly loggerService = inject(LoggerService);
  private readonly notificationService = inject(NotificationService);
  private readonly translateService = inject(TranslateService);

  findRaces(params: MemberAllRacesParameters) {
    this.loadingSeries = true;
    this.resultService.searchSeries(this.custId, params.year, params.season, {
      event_types: params.eventType,
      category_ids: params.categories,
      series_id: params.serie ?? undefined,
    }).subscribe({
      next: (data) => {
        this.loadingSeries = false;
        this.series = data;
        this.filteredSeries = data;
      }, error: (err) => {
        this.loggerService.error(err);
        this.notificationService.error(this.translateService.instant("Member.Errors.NoRaceFound"));
      }
    });
  }

  onFilter($event: SearchSeries[]) {
    this.filteredSeries = $event;
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['custId'] && !changes['custId'].firstChange) {
      this.series = undefined;
      this.filteredSeries = undefined;
      this.loadingSeries = false;
    }
  }

}
