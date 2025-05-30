import {Component, Input} from '@angular/core';

@Component({
  standalone: true,
  selector: 'isard-icon',
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  @Input() path!: string;
  @Input() width!: number;
  @Input() height!: number;
  @Input() color = '#000000';

}
