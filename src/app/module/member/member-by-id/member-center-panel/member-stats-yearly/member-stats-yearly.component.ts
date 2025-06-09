import {Component, Input, OnChanges} from "@angular/core";
import {LoadingScreenComponent} from "../../../../../components/loading-screen/loading-screen.component";
import {TranslatePipe} from "@ngx-translate/core";
import {BoxComponent} from "../../../../../components/box/box.component";
import {StatYearly} from "../../../../../services/iracing-entities";
import {StatsTableComponent} from "../stats-table/stats-table.component";

@Component({
  standalone: true,
  selector: "isard-member-stats-yearly",
  imports: [
    LoadingScreenComponent,
    TranslatePipe,
    BoxComponent,
    StatsTableComponent
  ],
  templateUrl: "./member-stats-yearly.component.html",
  styleUrl: "./member-stats-yearly.component.scss"
})
export class MemberStatsYearlyComponent implements OnChanges {
  @Input() stats: StatYearly[] | undefined = undefined;
  years: number[] = [];

  ngOnChanges(): void {
    this.years = [...new Set(this.stats?.map((s: StatYearly) => s.year).sort((a, b) => b - a))];
  }

  getStatYearly(year: number): StatYearly[] {
    return this.stats?.filter((s: StatYearly) => s.year === year) ?? [];
  }
}
