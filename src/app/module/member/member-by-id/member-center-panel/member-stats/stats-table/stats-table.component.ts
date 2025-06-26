import {Component, inject, Input, OnChanges, OnInit} from "@angular/core";
import {TableComponent} from "../../../../../../components/cosmetics/table/table.component";
import {StatCarrer} from "../../../../../../services/iracing-entities";
import {TableCell, TableHeader, TableService} from "../../../../../../services/app-services/table.service";
import {TranslateService} from "@ngx-translate/core";
import {LicenceService} from "../../../../../../services/app-services/licence.service";

@Component({
  standalone: true,
  selector: "isard-stats-table",
  imports: [
    TableComponent
  ],
  templateUrl: "./stats-table.component.html",
  styleUrl: "./stats-table.component.scss"
})
export class StatsTableComponent implements OnInit, OnChanges {
  @Input() stats!: StatCarrer[];
  rows!: TableCell[][];
  header!: TableHeader[];
  private readonly tableService = inject(TableService);
  private readonly translateService = inject(TranslateService);
  private readonly licenceService = inject(LicenceService);

  ngOnInit() {
    this.header = this.setHeader();
    this.rows = this.setRows();
  }

  ngOnChanges() {
    if (this.stats) {
      this.rows = this.setRows();
    }
  }

  getIcon(category_id: number) {
    return this.licenceService.getLicenceIcon(category_id);
  }

  setHeader(): TableHeader[] {
    return [
      this.tableService.createHeader(""),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.Category")),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.Starts")),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.Wins"), true),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.Top5"), true),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.Poles"), true),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.Laps"), true),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.LapsLed"), true),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.AverageStart"), true),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.AverageFinish"), true),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.AverageIncidents"), true),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.WinPercentage"), true),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.Top5Percentage"), true),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.PolePercentage"), true),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.LapsLedPercentage"), true),
    ];
  }

  setRows() {
    const rows: TableCell[][] = [];
    for (const stat of this.stats) {
      rows.push([
        this.tableService.createIcon(this.getIcon(stat.category_id), 30, 30, true),
        this.tableService.createCell(stat.category),
        this.tableService.createCell(stat.starts, true),
        this.tableService.createCell(stat.wins, true),
        this.tableService.createCell(stat.top5, true),
        this.tableService.createCell(stat.poles, true),
        this.tableService.createCell(stat.laps, true),
        this.tableService.createCell(stat.laps_led, true),
        this.tableService.createCell(stat.avg_start_position, true),
        this.tableService.createCell(stat.avg_finish_position, true),
        this.tableService.createCell(stat.avg_incidents.toFixed(2), true),
        this.tableService.createCell(`${stat.win_percentage}%`, true),
        this.tableService.createCell(`${stat.top5_percentage}%`, true),
        this.tableService.createCell(`${stat.poles_percentage}%`, true),
        this.tableService.createCell(`${stat.laps_led_percentage}%`, true),
      ]);
    }
    return rows;
  }
}
