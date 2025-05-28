import {Component, ComponentRef, OnInit, viewChild, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberService} from '../../services/request-services/member.service';
import {Member} from '../../entities/driver/Member';
import {Title} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {LoggerService} from '../../services/app-services/logger.service';

@Component({
  selector: 'isard-lookup-driver',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  imports: [
    CommonModule,
  ],
})
export class MemberComponent implements OnInit {
  member?: Member = undefined;
  isCharging = true;
  @ViewChild('centerPannel', {static: true}) public centerPannel?: ViewContainerRef;
  public vcr = viewChild('centerPannel', {read: ViewContainerRef});
  #componentRef?: ComponentRef<null>

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private loggerService: LoggerService,
    private titleService: Title,
    private router: Router,
  ) {
    route.params.subscribe(val => {
      if (val['memberId']) {
        this.memberService.getMember(+val['memberId'], true).subscribe({
          next: (member: Member) => {
            this.member = member
            this.titleService.setTitle('ISARD : ' + this.member?.display_name);
            this.isCharging = false;
            this.loggerService.log('Member loaded successfully');
          },
          error: error => {
            this.isCharging = false;
            this.loggerService.error(error, true);
          }
        })
      }
    });
  }

  ngOnInit(): void {
  }

  redirectTo(route: string[]): void {
    this.router.navigate(route);
  }
}
