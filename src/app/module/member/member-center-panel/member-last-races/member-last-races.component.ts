import {Component, Input, OnInit} from '@angular/core';
import {Member, Race} from '../../../../services/request-services/iracing-entities';
import {CommonModule, NgForOf} from '@angular/common';
import {StatsService} from '../../../../services/request-services/stats.service';
import {NotificationService} from '../../../../services/app-services/notification.service';
import {LoadingScreenComponent} from '../../../../components/loading-screen/loading-screen.component';
import {TranslatePipe} from '@ngx-translate/core';
import {LocalizedDatePipe} from '../../../../services/app-services/localized-date.pipe';

@Component({
  standalone: true,
  selector: 'isard-member-last-races',
  imports: [
    NgForOf,
    CommonModule,
    LoadingScreenComponent,
    TranslatePipe,
    LocalizedDatePipe
  ],
  templateUrl: './member-last-races.component.html',
  styleUrl: './member-last-races.component.scss'
})
export class MemberLastRacesComponent implements OnInit {
  @Input() member!: Member;
  races: Race[] | undefined = undefined;

  constructor(
    private statsService: StatsService,
    private notificationsService: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.statsService.getRecentRaces(this.member.cust_id).subscribe({
      next: (races: Race[]) => {
        this.races = races;
      }
    });
  }

  onClickResult(race: Race) {
    this.notificationsService.error("This feature is not implemented yet.");
  }
}
