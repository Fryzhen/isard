import {Component, EventEmitter, inject, OnInit, Output} from "@angular/core";
import {CheckboxGroupComponent} from "../../../../../../components/input/checkbox-group/checkbox-group.component";
import {
  ItemPicklistComponent,
  PicklistItem
} from "../../../../../../components/input/item-picklist/item-picklist.component";
import {LoadingScreenComponent} from "../../../../../../components/cosmetics/loading-screen/loading-screen.component";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {Category, EventType, Series} from "../../../../../../services/iracing-entities";
import {ConstantsService} from "../../../../../../services/request-services/constants.service";
import {SeriesService} from "../../../../../../services/request-services/series.service";
import {LoggerService} from "../../../../../../services/app-services/logger.service";
import {NotificationService} from "../../../../../../services/app-services/notification.service";
import {CollapseComponent} from "../../../../../../components/cosmetics/collapse/collapse.component";

export interface MemberAllRacesParameters {
  serie: number | null;
  year: number;
  season: number;
  eventType: EventType[];
  categories: Category[];
}

@Component({
  standalone: true,
  selector: "isard-member-all-races-parameters",
  imports: [
    CheckboxGroupComponent,
    ItemPicklistComponent,
    LoadingScreenComponent,
    TranslatePipe,
    CollapseComponent
  ],
  templateUrl: "./member-all-races-parameters.component.html",
  styleUrl: "./member-all-races-parameters.component.scss"
})
export class MemberAllRacesParametersComponent implements OnInit {
  @Output() research = new EventEmitter<MemberAllRacesParameters>();
  eventTypes?: EventType[] = undefined;
  eventTypesSelected?: EventType[] = undefined;
  categories?: Category[] = undefined;
  series?: Series[] = undefined;
  displaySeries?: PicklistItem[] = undefined;
  params: MemberAllRacesParameters = {
    year: new Date().getFullYear(),
    season: 1,
    serie: null,
    eventType: [],
    categories: []
  };
  private readonly constantsService = inject(ConstantsService);
  private readonly translateService = inject(TranslateService);
  private readonly loggerService = inject(LoggerService);
  private readonly notificationService = inject(NotificationService);
  private readonly seriesService = inject(SeriesService);

  ngOnInit() {
    this.constantsService.getEventTypes().subscribe({
      next: (data) => {
        data.reverse();
        this.eventTypes = data;
        this.eventTypesSelected = data.filter((et) => {
          return et.value === 5;
        });
        this.params.eventType = this.eventTypesSelected;
      }, error: (err) => {
        this.loggerService.error(err);
        this.notificationService.error(this.translateService.instant("Member.Errors.NoEventTypeFound"));
      }
    });
    this.constantsService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.params.categories = this.categories;
      }, error: (err) => {
        this.loggerService.error(err);
        this.notificationService.error(this.translateService.instant("Member.Errors.NoCategorieFound"));
      }
    });
    this.seriesService.getSeries().subscribe({
      next: (data) => {
        this.series = data;
        this.setDisplaySeries();
        this.params.serie = null;
      }, error: (err) => {
        this.loggerService.error(err);
        this.notificationService.error(this.translateService.instant("Member.Errors.NoSeriesFound"));
      }
    });
  }

  getItemsYear(): PicklistItem[] {
    const years: PicklistItem[] = [];
    for (let i = new Date().getFullYear(); i >= 2008; i--) {
      years.push({
        value: i, label: i.toString()
      });
    }
    return years;
  }

  getItemsQuarter() {
    return [{
      value: 1, label: this.translateService.instant("Member.ParameterPanel.AllRaces.Season") + " 1"
    }, {
      value: 2, label: this.translateService.instant("Member.ParameterPanel.AllRaces.Season") + " 2"
    }, {
      value: 3, label: this.translateService.instant("Member.ParameterPanel.AllRaces.Season") + " 3"
    }, {
      value: 4, label: this.translateService.instant("Member.ParameterPanel.AllRaces.Season") + " 4"
    }];
  }

  onYearClicked($event: PicklistItem | null) {
    if ($event) {
      this.params.year = $event.value;
    }
    this.setDisplaySeries();
  }

  onSeasonClicked($event: PicklistItem | null) {
    if ($event) {
      this.params.season = $event.value;
    }
    this.setDisplaySeries();
  }

  onSerieClicked($event: PicklistItem | null) {
    this.params.serie = $event ? $event.value : null;
  }

  onEventTypeClicked($event: EventType) {
    if (!this.params.eventType.includes($event)) {
      this.params.eventType.push($event);
    } else {
      this.params.eventType = this.params.eventType.filter(et => et.value !== $event.value);
    }
  }

  onCategorieClicked($event: Category) {
    if (!this.params.categories.includes($event)) {
      this.params.categories.push($event);
    } else {
      this.params.categories = this.params.categories.filter(cat => cat.value !== $event.value);
    }
    this.setDisplaySeries();
  }

  onResearchClicked() {
    this.research.emit(this.params);
  }

  private setDisplaySeries() {
    if (this.series) {
      this.displaySeries = this.series
        .filter((s: Series) => {
          return s.first_season.season_year < this.params.year || (s.first_season.season_year == this.params.year && s.first_season.season_quarter <= this.params.season);
        })
        .filter((s: Series) => {
          return this.params.categories.map(c => c.value).includes(s.category_id);
        })
        .map((s) => {
          return {
            label: s.series_short_name,
            value: s.series_id,
          } as PicklistItem;
        })
        .sort((s1: PicklistItem, s2: PicklistItem) => {
          return s1.label.localeCompare(s2.label);
        });
    }
  }
}
