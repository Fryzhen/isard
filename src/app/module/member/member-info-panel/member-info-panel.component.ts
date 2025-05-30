import {Component, Input} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {LicenceTileComponent} from '../../../components/licence-tile/licence-tile.component';
import {Member} from '../../../services/request-services/iracing-entities';

@Component({
  standalone: true,
  selector: 'isard-member-info-panel',
  imports: [
    DatePipe,
    LicenceTileComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './member-info-panel.component.html',
  styleUrl: './member-info-panel.component.scss'
})
export class MemberInfoPanelComponent {
  @Input() member!: Member;
}
