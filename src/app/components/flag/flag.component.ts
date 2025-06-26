import {Component, inject, Input, OnInit} from "@angular/core";
import {LookupService} from "../../services/request-services/lookup.service";
import {NgClass} from "@angular/common";

@Component({
  standalone: true,
  selector: "isard-flag",
  templateUrl: "./flag.component.html",
  imports: [NgClass],
  styleUrl: "./flag.component.scss"
})
export class FlagComponent implements OnInit {
  @Input() flairId: number | undefined = undefined;
  @Input() flairTag: string | undefined = undefined;
  classes: string[] = ["fi"];
  unknown = false;
  private readonly lookupService = inject(LookupService);

  ngOnInit() {
    if (this.flairId) {
      this.lookupService.getFlairs().subscribe(flairs => {
        const flair = flairs.find(flair => flair.flair_id === this.flairId);
        if (flair?.country_code) {
          this.classes.push(`fi-${flair.country_code.toLowerCase()}`);
        } else {
          this.unknown = true;
        }
      });
    } else if (this.flairTag) {
      this.classes.push(`fi-${this.flairTag.toLowerCase()}`);
    } else {
      this.unknown = true;
    }
  }
}
