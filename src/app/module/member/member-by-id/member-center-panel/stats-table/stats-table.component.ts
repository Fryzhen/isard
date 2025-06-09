import {Component, inject, Input} from '@angular/core';
import {TableComponent} from "../../../../../components/table/table.component";
import {StatCarrer} from "../../../../../services/iracing-entities";
import {TableCell, TableHeader, TableService} from "../../../../../services/app-services/table.service";
import {TranslateService} from "@ngx-translate/core";
import {LicenceService} from "../../../../../services/app-services/licence.service";

@Component({
  selector: 'isard-stats-table',
  imports: [
    TableComponent
  ],
  templateUrl: './stats-table.component.html',
  styleUrl: './stats-table.component.scss'
})
export class StatsTableComponent {
  @Input() stats: StatCarrer[] = [];
  private readonly tableService = inject(TableService);
  private readonly translateService = inject(TranslateService);
  private readonly licenceService = inject(LicenceService);

  getIcon(category_id: number) {
    return this.licenceService.getLicenceIcon(category_id);
  }

  getHeader(): TableHeader[] {
    return [
      this.tableService.createHeader(""),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.Category")),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.Starts")),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.Wins"), true),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.Top5"), true),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.Poles"), true),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.AverageStart"), true),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.AverageFinish"), true),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.AverageIncidents"), true),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.WinPercentage"), true),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.Top5Percentage"), true),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.PolePercentage"), true),
    ];
  }

  getRows() {
    const rows: TableCell[][] = [];
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
