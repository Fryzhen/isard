import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MemberService} from '../../services/request-services/member.service';
import {Member} from '../../services/request-services/iracing-entities';
import {Title} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {LoggerService} from '../../services/app-services/logger.service';
import {NotificationService} from '../../services/app-services/notification.service';
import {MemberInfoPanelComponent} from './member-info-panel/member-info-panel.component';
import {MemberParameterPanelComponent} from './member-parameter-panel/member-parameter-panel.component';
import {MemberLastRacesComponent} from './member-last-races/member-last-races.component';
import {MemberStatsGlobalComponent} from './member-stats-global/member-stats-global.component';
import {MemberStatsYearlyComponent} from './member-stats-yearly/member-stats-yearly.component';

export enum MemberScreenDisplay {
  LastRaces = 0,
  GlobalStats = 1,
  YearlyStats = 2,
}

@Component({
  standalone: true,
  selector: 'isard-lookup-driver',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  imports: [
    CommonModule,
    MemberInfoPanelComponent,
    MemberParameterPanelComponent,
    MemberLastRacesComponent,
    MemberStatsGlobalComponent,
    MemberStatsYearlyComponent
  ],
})
export class MemberComponent implements OnInit {
  member?: Member = undefined;
  isCharging = true;
  currentScreenDisplay: MemberScreenDisplay = MemberScreenDisplay.LastRaces;
  protected readonly MemberScreenDisplay = MemberScreenDisplay;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private loggerService: LoggerService,
    private notificationService: NotificationService,
    private titleService: Title,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      if (val['memberId']) {
        this.memberService.getMember(+val['memberId'], true).subscribe({
          next: (member: Member) => {
            this.member = member;
            this.isCharging = false;
            this.titleService.setTitle('ISARD : ' + this.member?.display_name);
            this.loggerService.log('Member loaded successfully');
          },
          error: error => {
            this.isCharging = false;
            this.titleService.setTitle('ISARD : Member not found');
            this.loggerService.error(error);
            this.notificationService.error('Member not found, please check the ID or contact support.');
          }
        });
      }
    });
  }

  setDisplay(screen: MemberScreenDisplay): void {
    this.currentScreenDisplay = screen;
  }

}
