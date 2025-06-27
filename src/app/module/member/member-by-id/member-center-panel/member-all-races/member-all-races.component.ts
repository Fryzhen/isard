import {Component, inject, Input, OnInit} from "@angular/core";
import {BoxComponent} from "../../../../../components/cosmetics/box/box.component";
import {LoadingScreenComponent} from "../../../../../components/cosmetics/loading-screen/loading-screen.component";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {
  ItemPicklistComponent,
  PicklistItem
} from "../../../../../components/input/item-picklist/item-picklist.component";
import {ResultsService} from "../../../../../services/request-services/results.service";
import {Category, EventType, SearchSeries} from "../../../../../services/iracing-entities";
import {ConstantsService} from "../../../../../services/request-services/constants.service";
import {CheckboxGroupComponent} from "../../../../../components/input/checkbox-group/checkbox-group.component";
import {DividerComponent} from "../../../../../components/cosmetics/divider/divider.component";

@Component({
  standalone: true,
  selector: "isard-member-all-races",
  imports: [BoxComponent, LoadingScreenComponent, TranslatePipe, ItemPicklistComponent, CheckboxGroupComponent, DividerComponent],
  templateUrl: "./member-all-races.component.html",
  styleUrl: "./member-all-races.component.scss"
})
export class MemberAllRacesComponent implements OnInit {
  protected readonly translateService = inject(TranslateService);
  protected readonly resultService = inject(ResultsService);
  protected readonly constantsService = inject(ConstantsService);

  @Input() custId!: number;

  eventTypes?: EventType[] = undefined;
  categories?: Category[] = undefined;
  params = {
    year: new Date().getFullYear(),
    season: 1,
    eventType: [] as EventType[],
    categories: [] as Category[]
  };
  series: SearchSeries[] = [];
  loadingSeries: boolean = false;

  ngOnInit() {
    this.constantsService.getEventTypes().subscribe({
      next: (data) => {
        data.reverse();
        this.eventTypes = data;
        this.params.eventType = this.eventTypes;
      }, error: (err) => {
        console.error(err);
      }
    });
    this.constantsService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.params.categories = this.categories;
      }, error: (err) => {
        console.error(err);
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

  findRaces() {
    this.loadingSeries = true;
    this.resultService.searchSeries(this.custId, this.params.year, this.params.season, {
      event_types: this.params.eventType,
      category_ids: this.params.categories
    }).subscribe({
      next: (data) => {
        this.loadingSeries = false;
        this.series = data;
      }, error: (err) => {
        console.error(err);
      }
    });
  }

  onYearClicked($event: PicklistItem) {
    this.params.year = $event.value;
  }

  onSeasonClicked($event: PicklistItem) {
    this.params.season = $event.value;
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
  }
}
