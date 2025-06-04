import {Component, Input, OnChanges} from "@angular/core";
import {YearStats} from "../../../../../services/request-services/iracing-entities";
import {NgForOf, NgIf} from "@angular/common";
import {LicenceService} from "../../../../../services/app-services/licence.service";
import {LoadingScreenComponent} from "../../../../../components/loading-screen/loading-screen.component";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {BoxComponent} from "../../../../../components/box/box.component";
import {TableComponent} from "../../../../../components/table/table.component";
import {TableCell, TableHeader, TableService} from "../../../../../services/app-services/table.service";

@Component({
  standalone: true,
  selector: "isard-member-stats-yearly",
  imports: [
    NgForOf,
    NgIf,
    LoadingScreenComponent,
    TranslatePipe,
    BoxComponent,
    TableComponent
  ],
  templateUrl: "./member-stats-yearly.component.html",
  styleUrl: "./member-stats-yearly.component.scss"
})
export class MemberStatsYearlyComponent implements OnChanges {
  @Input() stats: YearStats[] | undefined = undefined;
  years: number[] = [];

  constructor(
    private readonly licenceService: LicenceService,
    private readonly tableService: TableService,
    private readonly translateService: TranslateService
  ) {
  }

  ngOnChanges(): void {
    this.years = [...new Set(this.stats?.map((s: YearStats) => s.year).sort((a, b) => b - a))];
  }

  getIcon(category_id: number) {
    return this.licenceService.getLicenceIcon(category_id);
  }

  getYearStats(year: number): YearStats[] {
    return this.stats?.filter((s: YearStats) => s.year === year) ?? [];
  }

  getHeader(): TableHeader[] {
    return [
      this.tableService.createHeader(""),
      this.tableService.createHeader(this.translateService.instant("Member.YearlyPanel.Table.Category")),
      this.tableService.createHeader(this.translateService.instant("Member.YearlyPanel.Table.Starts")),
      this.tableService.createHeader(this.translateService.instant("Member.YearlyPanel.Table.Wins"), true),
      this.tableService.createHeader(this.translateService.instant("Member.YearlyPanel.Table.Top5"), true),
      this.tableService.createHeader(this.translateService.instant("Member.YearlyPanel.Table.Poles"), true),
      this.tableService.createHeader(this.translateService.instant("Member.YearlyPanel.Table.AverageStart"), true),
      this.tableService.createHeader(this.translateService.instant("Member.YearlyPanel.Table.AverageFinish"), true),
      this.tableService.createHeader(this.translateService.instant("Member.YearlyPanel.Table.AverageIncidents"), true),
      this.tableService.createHeader(this.translateService.instant("Member.YearlyPanel.Table.WinPercentage"), true),
      this.tableService.createHeader(this.translateService.instant("Member.YearlyPanel.Table.Top5Percentage"), true),
      this.tableService.createHeader(this.translateService.instant("Member.YearlyPanel.Table.PolePercentage"), true),
    ];

  }

  getRows(stats: YearStats[]) {
    const rows: TableCell[][] = [];
    if (!this.stats) {
      return rows;
    }
    for (const stat of stats) {
      rows.push([
        this.tableService.createIcon(this.getIcon(stat.category_id), 30, 30, true),
        this.tableService.createCell(stat.category),
        this.tableService.createCell(stat.starts, true),
        this.tableService.createCell(stat.wins, true),
        this.tableService.createCell(stat.top5, true),
        this.tableService.createCell(stat.poles, true),
        this.tableService.createCell(stat.avg_start_position, true),
        this.tableService.createCell(stat.avg_finish_position, true),
        this.tableService.createCell(stat.avg_incidents, true),
        this.tableService.createCell(stat.win_percentage, true),
        this.tableService.createCell(stat.top5_percentage, true),
        this.tableService.createCell(stat.poles_percentage, true),
      ]);
    }
    return rows;
  }
}
