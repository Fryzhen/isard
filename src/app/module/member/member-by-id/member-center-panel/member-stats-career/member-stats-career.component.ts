import {Component, inject, Input} from "@angular/core";
import {NgIf} from "@angular/common";
import {LicenceService} from "../../../../../services/app-services/licence.service";
import {LoadingScreenComponent} from "../../../../../components/loading-screen/loading-screen.component";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {BoxComponent} from "../../../../../components/box/box.component";
import {TableComponent} from "../../../../../components/table/table.component";
import {TableCell, TableHeader, TableService} from "../../../../../services/app-services/table.service";
import {StatCarrer} from "../../../../../services/iracing-entities";

@Component({
  standalone: true,
  selector: "isard-member-stats-career",
  imports: [
    NgIf,
    LoadingScreenComponent,
    TranslatePipe,
    BoxComponent,
    TableComponent
  ],
  templateUrl: "./member-stats-career.component.html",
  styleUrl: "./member-stats-career.component.scss"
})
export class MemberStatsCareerComponent {
  @Input() stats: StatCarrer[] | undefined = undefined;
  private readonly licenceService = inject(LicenceService);
  private readonly tableService = inject(TableService);
  private readonly translateService = inject(TranslateService);

  getIcon(category_id: number) {
    return this.licenceService.getLicenceIcon(category_id);
  }

  getHeader(): TableHeader[] {
    return [
      this.tableService.createHeader(""),
      this.tableService.createHeader(this.translateService.instant("Member.CareerPanel.Table.Category")),
      this.tableService.createHeader(this.translateService.instant("Member.CareerPanel.Table.Starts")),
      this.tableService.createHeader(this.translateService.instant("Member.CareerPanel.Table.Wins"), true),
      this.tableService.createHeader(this.translateService.instant("Member.CareerPanel.Table.Top5"), true),
      this.tableService.createHeader(this.translateService.instant("Member.CareerPanel.Table.Poles"), true),
      this.tableService.createHeader(this.translateService.instant("Member.CareerPanel.Table.AverageStart"), true),
      this.tableService.createHeader(this.translateService.instant("Member.CareerPanel.Table.AverageFinish"), true),
      this.tableService.createHeader(this.translateService.instant("Member.CareerPanel.Table.AverageIncidents"), true),
      this.tableService.createHeader(this.translateService.instant("Member.CareerPanel.Table.WinPercentage"), true),
      this.tableService.createHeader(this.translateService.instant("Member.CareerPanel.Table.Top5Percentage"), true),
      this.tableService.createHeader(this.translateService.instant("Member.CareerPanel.Table.PolePercentage"), true),
    ];

  }

  getRows() {
    const rows: TableCell[][] = [];
    if (!this.stats) {
      return rows;
    }
    for (const stat of this.stats) {
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
