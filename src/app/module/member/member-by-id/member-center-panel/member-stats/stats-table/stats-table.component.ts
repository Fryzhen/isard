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
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.Wins"), false, {"text-center": true}),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.Top5"), false, {"text-center": true}),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.Poles"), false, {"text-center": true}),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.Laps"), false, {"text-center": true}),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.LapsLed"), false, {"text-center": true}),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.AverageStart"), false, {"text-center": true}),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.AverageFinish"), false, {"text-center": true}),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.AverageIncidents"), false, {"text-center": true}),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.WinPercentage"), false, {"text-center": true}),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.Top5Percentage"), false, {"text-center": true}),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.PolePercentage"), false, {"text-center": true}),
      this.tableService.createHeader(this.translateService.instant("Member.StatTable.LapsLedPercentage"), false, {"text-center": true}),
    ];
  }

  setRows() {
    const rows: TableCell[][] = [];
    for (const stat of this.stats) {
      rows.push([
        this.tableService.createIcon(this.getIcon(stat.category_id), 30, 30, {"text-center": true}),
        this.tableService.createCell(stat.category),
        this.tableService.createCell(stat.starts, {"text-center": true}),
        this.tableService.createCell(stat.wins, {"text-center": true}),
        this.tableService.createCell(stat.top5, {"text-center": true}),
        this.tableService.createCell(stat.poles, {"text-center": true}),
        this.tableService.createCell(stat.laps, {"text-center": true}),
        this.tableService.createCell(stat.laps_led, {"text-center": true}),
        this.tableService.createCell(stat.avg_start_position, {"text-center": true}),
        this.tableService.createCell(stat.avg_finish_position, {"text-center": true}),
        this.tableService.createCell(stat.avg_incidents.toFixed(2), {"text-center": true}),
        this.tableService.createCell(`${stat.win_percentage}%`, {"text-center": true}),
        this.tableService.createCell(`${stat.top5_percentage}%`, {"text-center": true}),
        this.tableService.createCell(`${stat.poles_percentage}%`, {"text-center": true}),
        this.tableService.createCell(`${stat.laps_led_percentage}%`, {"text-center": true}),
      ]);
    }
    return rows;
  }
}
