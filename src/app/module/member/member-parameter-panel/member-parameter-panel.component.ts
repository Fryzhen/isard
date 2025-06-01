import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MemberScreenDisplay} from '../member.component';
import {TranslatePipe} from '@ngx-translate/core';
import {BoxComponent} from '../../../components/box/box.component';

@Component({
  standalone: true,
  selector: 'isard-member-parameter-panel',
  imports: [
    TranslatePipe,
    BoxComponent
  ],
  templateUrl: './member-parameter-panel.component.html',
  styleUrl: './member-parameter-panel.component.scss'
})
export class MemberParameterPanelComponent {
  @Input() currentScreenDisplay!: MemberScreenDisplay | undefined;
  @Output() screenDisplayChange = new EventEmitter<MemberScreenDisplay>();

  protected readonly MemberScreenDisplay = MemberScreenDisplay;

  changeDisplay(screen: MemberScreenDisplay): void {
    this.screenDisplayChange.emit(screen);
  }
}
