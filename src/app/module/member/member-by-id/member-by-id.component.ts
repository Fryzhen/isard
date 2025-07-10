import {Component, inject, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MemberInfoPanelComponent} from "./member-info-panel/member-info-panel.component";
import {
  MemberParameters,
  MemberScreenSelectorComponent
} from "./member-screen-selector/member-screen-selector.component";
import {TranslatePipe} from "@ngx-translate/core";
import {MemberCenterPanelComponent} from "./member-center-panel/member-center-panel.component";

export enum MemberScreenDisplay {
  LastRaces,
  AllRaces,
  CareerStats,
}

@Component({
  standalone: true,
  selector: "isard-lookup-driver",
  templateUrl: "./member-by-id.component.html",
  styleUrls: ["./member-by-id.component.scss"],
  imports: [
    CommonModule,
    MemberInfoPanelComponent,
    MemberScreenSelectorComponent,
    TranslatePipe,
    MemberCenterPanelComponent
  ],
})
export class MemberByIdComponent implements OnInit {
  custId?: number = undefined;
  currentScreenDisplay: MemberScreenDisplay = MemberScreenDisplay.LastRaces;
  parameters: MemberParameters = {} as MemberParameters;
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      this.custId = undefined;
      if (val["memberId"]) {
        this.custId = +val["memberId"];
      }
    });
  }

  setParameters($event: MemberParameters): void {
    this.parameters = $event;
  }

  changeScreen($event: MemberScreenDisplay): void {
    this.currentScreenDisplay = $event;
  }
}
