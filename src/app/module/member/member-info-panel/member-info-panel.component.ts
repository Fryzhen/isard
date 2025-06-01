import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {LicenceTileComponent} from '../../../components/licence-tile/licence-tile.component';
import {Member} from '../../../services/request-services/iracing-entities';
import {TranslatePipe} from '@ngx-translate/core';
import {LocalizedDatePipe} from '../../../services/app-services/localized-date.pipe';

@Component({
  standalone: true,
  selector: 'isard-member-info-panel',
  imports: [
    LicenceTileComponent,
    NgForOf,
    NgIf,
    TranslatePipe,
    LocalizedDatePipe
  ],
  templateUrl: './member-info-panel.component.html',
  styleUrl: './member-info-panel.component.scss'
})
export class MemberInfoPanelComponent {
  @Input() member!: Member;
}
