import {Component, ComponentRef, OnInit, ViewContainerRef, viewChild, ViewChild} from '@angular/core';
import {ActivatedRoute, ɵEmptyOutletComponent} from '@angular/router';
import {MemberService} from '../../../services/requests/member.service';
import {Member} from '../../../entities/Member';
import {NgIf} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'isard-lookup-driver',
  templateUrl: './member-by-id.component.html',
  styleUrls: ['./member-by-id.component.scss'],
  imports: [
    NgIf,
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
    private titleService: Title,
    private router: Router,
  ) {
    route.params.subscribe(val => {
      if (val['memberId']) {
        this.memberService.getMember(+val['memberId'], true)
        .then(member => {
          console.log(member);
          this.member = member
          this.titleService.setTitle('ISARD : ' + this.member?.display_name);
          this.isCharging = false;
        })
        .catch(error => {
          this.isCharging = false;
          console.error('Error fetching member:', error);
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
