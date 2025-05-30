import {Component, Input} from '@angular/core';
import {Member} from '../../../services/request-services/iracing-entities';

@Component({
  standalone: true,
  selector: 'isard-member-stats-global',
  imports: [],
  templateUrl: './member-stats-global.component.html',
  styleUrl: './member-stats-global.component.scss'
})
export class MemberStatsGlobalComponent {
  @Input() member!: Member;
}
