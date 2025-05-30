import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MemberScreenDisplay} from '../member.component';

@Component({
  standalone: true,
  selector: 'isard-member-parameter-panel',
  imports: [],
  templateUrl: './member-parameter-panel.component.html',
  styleUrl: './member-parameter-panel.component.scss'
})
export class MemberParameterPanelComponent {
  @Input() currentScreenDisplay!: MemberScreenDisplay;
  @Output() screenDisplayChange = new EventEmitter<MemberScreenDisplay>();

  protected readonly MemberScreenDisplay = MemberScreenDisplay;

  changeDisplay(screen: MemberScreenDisplay): void {
    this.screenDisplayChange.emit(screen);
  }
}
