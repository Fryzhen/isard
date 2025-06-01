import {Component, Input} from '@angular/core';
import {ResultsService, SearchSeriesConfig} from '../../../../../services/request-services/results.service';
import {EventType} from '../../../../../services/request-services/iracing-entities';

@Component({
  selector: 'isard-member-all-races',
  imports: [],
  templateUrl: './member-all-races.component.html',
  styleUrl: './member-all-races.component.scss'
})
export class MemberAllRacesComponent {
  @Input() races!: any;

  constructor(
  ) {
    this.onChange();
  }

  onChange(): void {
  }
}
