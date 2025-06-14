import {Component, Input} from "@angular/core";
import {BoxComponent} from "../../../../../components/box/box.component";
import {LoadingScreenComponent} from "../../../../../components/loading-screen/loading-screen.component";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  standalone: true,
  selector: "isard-member-all-races",
  imports: [
    BoxComponent,
    LoadingScreenComponent,
    TranslatePipe
  ],
  templateUrl: "./member-all-races.component.html",
  styleUrl: "./member-all-races.component.scss"
})
export class MemberAllRacesComponent {
  @Input() cust_id!: number;
}
