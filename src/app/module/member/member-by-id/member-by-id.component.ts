import {Component, inject, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {MemberService} from "../../../services/request-services/member.service";
import {Title} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {LoggerService} from "../../../services/app-services/logger.service";
import {NotificationService} from "../../../services/app-services/notification.service";
import {MemberInfoPanelComponent} from "./member-info-panel/member-info-panel.component";
import {
  MemberScreenSelectorComponent,
  MemberParameters
} from "./member-screen-selector/member-screen-selector.component";
import {LoadingScreenComponent} from "../../../components/cosmetics/loading-screen/loading-screen.component";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {MemberCenterPanelComponent} from "./member-center-panel/member-center-panel.component";
import {Member} from "../../../services/iracing-entities";

export enum MemberScreenDisplay {
  LastRaces,
  AllRaces,
  CareerStats,
  YearlyStats,
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
    LoadingScreenComponent,
    TranslatePipe,
    MemberCenterPanelComponent
  ],
})
export class MemberByIdComponent implements OnInit {
  isCharging = true;
  member?: Member = undefined;
  currentScreenDisplay: MemberScreenDisplay = MemberScreenDisplay.LastRaces;
  parameters: MemberParameters = {} as MemberParameters;
  private readonly route = inject(ActivatedRoute);
  private readonly memberService = inject(MemberService);
  private readonly loggerService = inject(LoggerService);
  private readonly notificationService = inject(NotificationService);
  private readonly titleService = inject(Title);
  private readonly translateService = inject(TranslateService);

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      this.isCharging = true;
      if (val["memberId"]) {
        this.getMember(+val["memberId"]);
      }
    });
  }

  getMember(memberId: number): void {
    this.memberService.getMember(memberId, true).subscribe({
      next: (member: Member) => {
        this.member = member;
        this.isCharging = false;
        this.titleService.setTitle(this.translateService.instant("Member.MainPanel.Title") + " : " + this.member?.display_name);
      },
      error: error => {
        this.isCharging = false;
        this.loggerService.error(error);
        this.titleService.setTitle(this.translateService.instant("Member.Errors.MemberNotFoundTitle"));
        this.notificationService.error(this.translateService.instant("Member.Errors.MemberNotFound"));
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
