import {Component, Input} from "@angular/core";
import {BoxComponent} from "../../../../../components/box/box.component";
import {LoadingScreenComponent} from "../../../../../components/loading-screen/loading-screen.component";
import {NgIf} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {SearchSeries} from "../../../../../services/iracing-entities";

@Component({
  standalone: true,
  selector: "isard-member-all-races",
  imports: [
    BoxComponent,
    LoadingScreenComponent,
    NgIf,
    TranslatePipe
  ],
  templateUrl: "./member-all-races.component.html",
  styleUrl: "./member-all-races.component.scss"
})
export class MemberAllRacesComponent {
  @Input() races!: SearchSeries[] | undefined;
}
