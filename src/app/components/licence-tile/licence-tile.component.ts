import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {License} from '../../entities/driver/License';

@Component({
  selector: 'isard-licence-tile',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './licence-tile.component.html',
  styleUrl: './licence-tile.component.scss'
})
export class LicenceTileComponent {
  @Input ({required: true}) licence!: License;

  constructor() {
  }
}
