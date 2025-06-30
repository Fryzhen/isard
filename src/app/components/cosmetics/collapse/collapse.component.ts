import {Component, inject, Input} from '@angular/core';
import {NgClass} from "@angular/common";
import {UuidService} from "../../../services/app-services/uuid.service";

@Component({
  selector: 'isard-collapse',
  imports: [
    NgClass
  ],
  templateUrl: './collapse.component.html',
  styleUrl: './collapse.component.scss'
})
export class CollapseComponent {
  @Input() defaultCollapsed = false;
  @Input() label: string = '';
  private uuidService = inject(UuidService);
  uuid = this.uuidService.generate();
}
