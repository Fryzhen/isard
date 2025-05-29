import { Component, Input } from '@angular/core';
import { NgOptimizedImage, NgClass } from '@angular/common';
import { License } from '../../entities/driver/License';

@Component({
  selector: 'isard-licence-tile',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './licence-tile.component.html',
  styleUrl: './licence-tile.component.scss'
})
export class LicenceTileComponent {
  @Input({ required: true }) licence!: License;
}