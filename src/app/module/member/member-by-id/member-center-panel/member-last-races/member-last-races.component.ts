import {Component, Input} from '@angular/core';
import {RecentRace} from '../../../../../services/request-services/iracing-entities';
import {CommonModule, NgForOf} from '@angular/common';
import {LoadingScreenComponent} from '../../../../../components/loading-screen/loading-screen.component';
import {TranslatePipe} from '@ngx-translate/core';
import {LocalizedDatePipe} from '../../../../../services/app-services/localized-date.pipe';
import {BoxComponent} from '../../../../../components/box/box.component';
import {TableComponent, TableHeader, TableRow} from '../../../../../components/table/table.component';

@Component({
  standalone: true,
  selector: 'isard-member-last-races',
  imports: [NgForOf, CommonModule, LoadingScreenComponent, TranslatePipe, LocalizedDatePipe, BoxComponent, TableComponent],
  templateUrl: './member-last-races.component.html',
  styleUrl: './member-last-races.component.scss'
})
export class MemberLastRacesComponent {
  @Input() races: RecentRace[] | undefined = undefined;

  getHeader(): TableHeader[] {
  }

  getRows(): TableRow[][] {

  }
}
