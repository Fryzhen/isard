import {Component, Input} from '@angular/core';
import {Race} from '../../../../../services/request-services/iracing-entities';
import {BoxComponent} from '../../../../../components/box/box.component';

@Component({
  standalone: true,
  selector: 'isard-member-all-races',
  imports: [
    BoxComponent
  ],
  templateUrl: './member-all-races.component.html',
  styleUrl: './member-all-races.component.scss'
})
export class MemberAllRacesComponent {
  @Input() races!: Race[] | undefined;
}
