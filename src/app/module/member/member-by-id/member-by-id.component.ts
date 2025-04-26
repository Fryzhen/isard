import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MemberService} from '../../../services/member.service';
import {Member} from '../../../entities/Member';
import {NgIf} from '@angular/common';

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

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
  ) {
    route.params.subscribe(val => {
      if (val['memberId']) {
        this.memberService.getMember(+val['memberId']).then(member => this.member = member).catch(error => {
          console.error('Error fetching member:', error);
        });
      }
    });
  }

  ngOnInit(): void {
  }
}
