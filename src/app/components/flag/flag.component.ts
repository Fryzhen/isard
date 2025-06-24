import {Component, inject, Input, OnInit} from "@angular/core";
import {LookupService} from "../../services/request-services/lookup.service";
import {NgClass} from "@angular/common";

@Component({
  standalone: true,
  selector: "isard-flag",
  templateUrl: "./flag.component.html",
  imports: [
    NgClass
  ],
  styleUrl: "./flag.component.scss"
})
export class FlagComponent implements OnInit {
  private readonly lookupService = inject(LookupService);

  @Input() flairId!: number;
  classes: string[] = ['fi'];
  unknown = false;

  ngOnInit() {
    this.lookupService.getFlairs().subscribe(flairs => {
      const flair = flairs.find(flair => flair.flair_id === this.flairId)
      if (flair?.country_code) {
        this.classes.push(`fi-${flair.country_code.toLowerCase()}`);
      } else {
        this.unknown = true;
      }
    })
  }
}
