import {Component, inject, Input} from "@angular/core";
import {BoxComponent} from "../../../../../components/box/box.component";
import {LoadingScreenComponent} from "../../../../../components/loading-screen/loading-screen.component";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {
  ItemPicklistComponent,
  PicklistItem
} from "../../../../../components/picklist/item-picklist/item-picklist.component";

@Component({
  standalone: true,
  selector: "isard-member-all-races",
  imports: [
    BoxComponent,
    LoadingScreenComponent,
    TranslatePipe,
    ItemPicklistComponent
  ],
  templateUrl: "./member-all-races.component.html",
  styleUrl: "./member-all-races.component.scss"
})
export class MemberAllRacesComponent {
  protected readonly translateService = inject(TranslateService);
  @Input() cust_id!: number;

  getItemsYear(): PicklistItem[] {
    const years: PicklistItem[] = [];
    for (let i = new Date().getFullYear(); i >= 2008; i--) {
      years.push({
        id: i, text: i.toString()
      });
    }
    return years;
  }

  getItemsQuarter() {
    return [{
      id: 1, text: this.translateService.instant("Member.ParameterPanel.AllRaces.Quarter.Q1")
    }, {
      id: 2, text: this.translateService.instant("Member.ParameterPanel.AllRaces.Quarter.Q2")
    }, {
      id: 3, text: this.translateService.instant("Member.ParameterPanel.AllRaces.Quarter.Q3")
    }, {
      id: 4, text: this.translateService.instant("Member.ParameterPanel.AllRaces.Quarter.Q4")
    }];
  }

  getItemsEventType() {
    return [{
      id: 5, text: this.translateService.instant("Member.ParameterPanel.AllRaces.Event.Race")
    }, {
      id: 2, text: this.translateService.instant("Member.ParameterPanel.AllRaces.Event.Practice")
    }, {
      id: 3, text: this.translateService.instant("Member.ParameterPanel.AllRaces.Event.Qualify")
    }, {
      id: 4, text: this.translateService.instant("Member.ParameterPanel.AllRaces.Event.TimeTrial")
    }];
  }
}
