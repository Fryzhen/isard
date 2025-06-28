import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {CheckboxGroupComponent} from "../../../../../../components/input/checkbox-group/checkbox-group.component";
import {
  ItemPicklistComponent,
  PicklistItem
} from "../../../../../../components/input/item-picklist/item-picklist.component";
import {LoadingScreenComponent} from "../../../../../../components/cosmetics/loading-screen/loading-screen.component";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {Category, EventType} from "../../../../../../services/iracing-entities";
import {ConstantsService} from "../../../../../../services/request-services/constants.service";

export interface MemberAllRacesParameters {
  year: number;
  season: number;
  eventType: EventType[];
  categories: Category[];
}

@Component({
  selector: 'isard-member-all-races-parameters',
  imports: [
    CheckboxGroupComponent,
    ItemPicklistComponent,
    LoadingScreenComponent,
    TranslatePipe
  ],
  templateUrl: './member-all-races-parameters.component.html',
  styleUrl: './member-all-races-parameters.component.scss'
})
export class MemberAllRacesParametersComponent implements OnInit {
  @Output() research = new EventEmitter<MemberAllRacesParameters>();
  eventTypes?: EventType[] = undefined;
  eventTypesSelected?: EventType[] = undefined;
  categories?: Category[] = undefined;
  params: MemberAllRacesParameters = {
    year: new Date().getFullYear(),
    season: 1,
    eventType: [],
    categories: []
  };
  protected readonly constantsService = inject(ConstantsService);
  protected readonly translateService = inject(TranslateService);

  ngOnInit() {
    this.constantsService.getEventTypes().subscribe({
      next: (data) => {
        data.reverse();
        this.eventTypes = data;
        this.eventTypesSelected = data.filter((et) => {
          return et.value === 5
        })
        this.params.eventType = this.eventTypesSelected;
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

  onResearchClicked() {
    this.research.emit(this.params)
  }
}
