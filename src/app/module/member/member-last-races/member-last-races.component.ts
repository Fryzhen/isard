import {Component, Input} from '@angular/core';
import {Member} from '../../../services/request-services/iracing-entities';

@Component({
  standalone: true,
  selector: 'isard-member-last-races',
  imports: [],
  templateUrl: './member-last-races.component.html',
  styleUrl: './member-last-races.component.scss'
})
export class MemberLastRacesComponent {
  @Input() member!: Member;
}
