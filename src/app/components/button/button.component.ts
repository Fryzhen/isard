import { Component } from '@angular/core';
import { Input } from '@angular/core';
import {NgClass} from '@angular/common';

export class ButtonType {
  static readonly PRIMARY = 'primary';
  static readonly SECONDARY = 'secondary';
  static readonly SUCCESS = 'success';
  static readonly DANGER = 'danger';
  static readonly WARNING = 'warning';
  static readonly INFO = 'info';
  static readonly LIGHT = 'light';
  static readonly DARK = 'dark';
  static readonly LINK = 'link';
}

@Component({
  selector: 'isard-button',
  imports: [
    NgClass
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() type: ButtonType = ButtonType.PRIMARY;
  @Input() outlined: boolean = false;

  onClick() {

  }
}
