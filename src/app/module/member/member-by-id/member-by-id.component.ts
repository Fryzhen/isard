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
  memberId: string | null = null;
  member?: Member = undefined;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    this.memberId = this.route.snapshot.paramMap.get('memberId');
    console.log('Member ID:', this.memberId);
    if (this.memberId) {
    this.memberService.getMember(+this.memberId).then(member => {
      console.log("Member data:");
      console.log(member);
      this.member = member;
    })
    }
  }
}
