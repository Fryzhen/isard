import {Component, Input, OnInit} from '@angular/core';
import {Race} from '../../../../../services/request-services/iracing-entities';
import {CommonModule, NgForOf} from '@angular/common';
import {NotificationService} from '../../../../../services/app-services/notification.service';
import {LoadingScreenComponent} from '../../../../../components/loading-screen/loading-screen.component';
import {TranslatePipe} from '@ngx-translate/core';
import {LocalizedDatePipe} from '../../../../../services/app-services/localized-date.pipe';
import {BoxComponent} from '../../../../../components/box/box.component';

@Component({
  standalone: true,
  selector: 'isard-member-last-races',
  imports: [
    NgForOf,
    CommonModule,
    LoadingScreenComponent,
    TranslatePipe,
    LocalizedDatePipe,
    BoxComponent
  ],
  templateUrl: './member-last-races.component.html',
  styleUrl: './member-last-races.component.scss'
})
export class MemberLastRacesComponent implements OnInit {
  @Input() races: Race[] | undefined = undefined;

  constructor(
    private notificationsService: NotificationService,
  ) {
  }

  ngOnInit(): void {
  }

  onClickResult(race: Race) {
    this.notificationsService.error("This feature is not implemented yet.");
  }
}
