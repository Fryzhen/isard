import {Component, ComponentRef, OnInit, viewChild, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberService} from '../../services/request-services/member.service';
import {Member} from '../../services/request-services/iracing-entities';
import {Title} from '@angular/platform-browser';
import {CommonModule, DatePipe} from '@angular/common';
import {LoggerService} from '../../services/app-services/logger.service';
import {NotificationService} from '../../services/app-services/notification.service';
import {LicenceTileComponent} from '../../components/licence-tile/licence-tile.component';

@Component({
  selector: 'isard-lookup-driver',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  imports: [
    CommonModule,
    DatePipe,
    LicenceTileComponent
  ],
})
export class MemberComponent implements OnInit {
  member?: Member = undefined;
  isCharging = true;
  @ViewChild('centerPanel', {static: true}) public centerPanel?: ViewContainerRef;
  public vcr = viewChild('centerPanel', {read: ViewContainerRef});
  #componentRef?: ComponentRef<null>

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private loggerService: LoggerService,
    private notificationService: NotificationService,
    private titleService: Title,
    private router: Router,
  ) {
    route.params.subscribe(val => {
      if (val['memberId']) {
        this.memberService.getMember(+val['memberId'], true).subscribe({
          next: (member: Member) => {
            this.member = member;
            this.isCharging = false;
            this.titleService.setTitle('ISARD : ' + this.member?.display_name);
            this.loggerService.log('Member loaded successfully');
            console.log(member);
            console.log(member.licenses);
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

  ngOnInit(): void {
  }

  redirectTo(route: string[]): void {
    this.router.navigate(route);
  }
}
