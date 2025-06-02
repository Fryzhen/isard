import {Component, Input} from '@angular/core';
import {Race} from '../../../../../services/request-services/iracing-entities';
import {BoxComponent} from '../../../../../components/box/box.component';
import {LoadingScreenComponent} from '../../../../../components/loading-screen/loading-screen.component';
import {NgIf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'isard-member-all-races',
  imports: [
    BoxComponent,
    LoadingScreenComponent,
    NgIf,
    TranslatePipe
  ],
  templateUrl: './member-all-races.component.html',
  styleUrl: './member-all-races.component.scss'
})
export class MemberAllRacesComponent {
  @Input() races!: Race[] | undefined;
}
