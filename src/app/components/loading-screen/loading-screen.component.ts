import {Component} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'isard-loading-screen',
  imports: [
    TranslatePipe
  ],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss'
})
export class LoadingScreenComponent {
  points = '';
  pointsCount = 0;

  constructor() {
    this.updatePoints();
    setInterval(() => this.updatePoints(), 500);
  }

  private updatePoints(): void {
    this.pointsCount = (this.pointsCount + 1) % 4; // Cycle through 0 to 3
    this.points = '.'.repeat(this.pointsCount); // Create a string with the current number of dots
  }
}
