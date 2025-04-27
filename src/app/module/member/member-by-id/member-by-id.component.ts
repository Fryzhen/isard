import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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
    NgIf
  ],
})
export class MemberByIdComponent implements OnInit {
  member?: Member = undefined;
  isCharging = true;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private titleService: Title,
    private router: Router,
  ) {
    route.params.subscribe(val => {
      if (val['memberId']) {
        this.memberService.getMember(+val['memberId'])
        .then(member => {
          this.member = member
          this.titleService.setTitle('ISARD : ' + this.member?.display_name);
          this.isCharging = false;
        })
        .catch(error => {
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
