import {Component, Input} from "@angular/core";
import {LoadingScreenComponent} from "../../../../../components/loading-screen/loading-screen.component";
import {TranslatePipe} from "@ngx-translate/core";
import {BoxComponent} from "../../../../../components/box/box.component";
import {StatCarrer} from "../../../../../services/iracing-entities";
import {StatsTableComponent} from "../stats-table/stats-table.component";

@Component({
  standalone: true,
  selector: "isard-member-stats-career",
  imports: [
    LoadingScreenComponent,
    TranslatePipe,
    BoxComponent,
    StatsTableComponent
  ],
  templateUrl: "./member-stats-career.component.html",
  styleUrl: "./member-stats-career.component.scss"
})
export class MemberStatsCareerComponent {
  @Input() stats: StatCarrer[] | undefined = undefined;

}
