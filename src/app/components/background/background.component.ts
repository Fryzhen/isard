import {Component, Input, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  standalone: true,
  selector: 'isard-background',
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss'
})
export class BackgroundComponent implements OnInit {
  @Input({required: true}) images!: string[];
  currentIndex = 0;
  nextIndex = 1;
  currentImage = '';
  nextImage = '';
  nextOpacity = 0;

  ngOnInit(): void {
    this.currentImage = this.images[this.currentIndex];
    this.nextImage = this.images[this.nextIndex];

    setInterval(() => {
      this.nextIndex = (this.currentIndex + 1) % this.images.length;
      this.nextImage = this.images[this.nextIndex];
      this.nextOpacity = 1;
      setTimeout(() => {
        this.currentIndex = this.nextIndex;
        this.currentImage = this.nextImage;
        this.nextOpacity = 0;
      }, 750); // fade duration
    }, 15000);
  }
}
