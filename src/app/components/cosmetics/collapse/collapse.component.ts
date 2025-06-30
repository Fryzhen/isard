import {Component, inject, Input} from '@angular/core';
import {NgClass} from "@angular/common";
import {UuidService} from "../../../services/app-services/uuid.service";

@Component({
  selector: 'isard-collapse',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './collapse.component.html',
  styleUrl: './collapse.component.scss'
})
export class CollapseComponent {
  @Input() collapsed = false;
  @Input() label = "";
  private readonly uuidService = inject(UuidService);
  uuid = this.uuidService.generate();

  onCollapsing() {
    this.collapsed = !this.collapsed;
  }
}
