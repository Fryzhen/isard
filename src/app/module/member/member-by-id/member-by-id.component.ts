import {Component, ComponentRef, OnInit, viewChild, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberService} from '../../../services/request-services/member.service';
import {Member} from '../../../entities/driver/Member';
import {Title} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {NotificationService} from '../../../services/app-services/notification.service';

@Component({
  selector: 'isard-lookup-driver',
  templateUrl: './member-by-id.component.html',
  styleUrls: ['./member-by-id.component.scss'],
  imports: [
    CommonModule,
  ],
})
export class MemberByIdComponent implements OnInit {
  member?: Member = undefined;
  isCharging = true;

  #componentRef?: ComponentRef<null>
  @ViewChild('centerPannel', {static: true}) public centerPannel?: ViewContainerRef;
  public vcr = viewChild('centerPannel', {read: ViewContainerRef});

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private notificationService: NotificationService,
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
            this.notificationService.success('Member loaded successfully');
          },
          error: error => {
            this.isCharging = false;
            console.error('Error fetching member:', error);
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
