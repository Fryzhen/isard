import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MemberScreenDisplay} from "../member-by-id.component";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {BoxComponent} from "../../../../components/box/box.component";
import {EventType} from "../../../../services/iracing-entities";
import {
  ItemPicklistComponent,
  PicklistItem
} from "../../../../components/picklist/item-picklist/item-picklist.component";

export interface MemberParameters {
  year: number,
  quarter: number,
  eventType: EventType[]
}

@Component({
  standalone: true,
  selector: "isard-member-parameter-panel",
  imports: [TranslatePipe, BoxComponent, ItemPicklistComponent],
  templateUrl: "./member-screen-selector.component.html",
  styleUrl: "./member-screen-selector.component.scss"
})
export class MemberScreenSelectorComponent {
  @Input() currentScreenDisplay!: MemberScreenDisplay | undefined;
  @Output() screen = new EventEmitter<MemberScreenDisplay>();
  @Output() parameters = new EventEmitter<MemberParameters>();

  protected readonly MemberScreenDisplay = MemberScreenDisplay;

  constructor(protected readonly translateService: TranslateService) {
  }

  changeScreen(screen: MemberScreenDisplay): void {
    this.screen.emit(screen);
  }

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
