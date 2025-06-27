import {Component, Input} from '@angular/core';

@Component({
  standalone: true,
  selector: 'isard-divider',
  imports: [],
  templateUrl: './divider.component.html',
  styleUrl: './divider.component.scss'
})
export class DividerComponent {
  @Input() marginTop: number = 0;
  @Input() marginBottom: number = 0;
}
