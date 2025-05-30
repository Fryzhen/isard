import {Component, Input} from '@angular/core';
import {Member} from '../../../services/request-services/iracing-entities';

@Component({
  standalone: true,
  selector: 'isard-member-stats-yearly',
  imports: [],
  templateUrl: './member-stats-yearly.component.html',
  styleUrl: './member-stats-yearly.component.scss'
})
export class MemberStatsYearlyComponent {
  @Input() member!: Member;
}
