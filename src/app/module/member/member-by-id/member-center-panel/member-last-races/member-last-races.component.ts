import {Component, inject, Input, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {BoxComponent} from "../../../../../components/box/box.component";
import {TableComponent} from "../../../../../components/table/table.component";
import {TableCell, TableHeader, TableService} from "../../../../../services/app-services/table.service";
import {NotificationService} from "../../../../../services/app-services/notification.service";
import {RecentRace} from "../../../../../services/iracing-entities";
import {StatsService} from "../../../../../services/request-services/stats.service";
import {LoggerService} from "../../../../../services/app-services/logger.service";
import {LoadingScreenComponent} from "../../../../../components/loading-screen/loading-screen.component";

@Component({
  standalone: true,
  selector: "isard-member-last-races",
  imports: [
    CommonModule,
    TranslatePipe,
    BoxComponent,
    TableComponent,
    LoadingScreenComponent
  ],
  templateUrl: "./member-last-races.component.html",
  styleUrl: "./member-last-races.component.scss"
})
export class MemberLastRacesComponent implements OnInit {
  @Input() cust_id!: number;
  rows: TableCell[][] | undefined;
  header: TableHeader[] | undefined;
  private readonly tableService = inject(TableService);
  private readonly notificationService = inject(NotificationService);
  private readonly translateService = inject(TranslateService);
  private readonly statsService = inject(StatsService);
  private readonly loggerService = inject(LoggerService);

  ngOnInit(): void {
    this.statsService.getRecentRaces(this.cust_id).subscribe({
      next: (races: RecentRace[]) => {
        this.header = this.setHeader();
        this.rows = this.setRows(races);
      },
      error: (error: string) => {
        this.notificationService.error(this.translateService.instant("Member.Errors.ImpossibleGetData"));
        this.loggerService.error(error);
      }
    });
  }

  setHeader(): TableHeader[] {
    return [
      this.tableService.createHeader(this.translateService.instant("Member.LastRacesPanel.Table.Date")),
      this.tableService.createHeader(this.translateService.instant("Member.LastRacesPanel.Table.Car")),
      this.tableService.createHeader(this.translateService.instant("Member.LastRacesPanel.Table.Track")),
      this.tableService.createHeader(this.translateService.instant("Member.LastRacesPanel.Table.Start"), true),
      this.tableService.createHeader(this.translateService.instant("Member.LastRacesPanel.Table.Finish"), true),
      this.tableService.createHeader(this.translateService.instant("Member.LastRacesPanel.Table.PosDif"), true),
      this.tableService.createHeader(this.translateService.instant("Member.LastRacesPanel.Table.Incidents"), true),
      this.tableService.createHeader(this.translateService.instant("Member.LastRacesPanel.Table.IrDif"), true),
      this.tableService.createHeader(this.translateService.instant("Member.LastRacesPanel.Table.SrDif"), true),
      this.tableService.createHeader(""),
    ];

  }

  setRows(races: RecentRace[]): TableCell[][] {
    const rows: TableCell[][] = [];
    for (const race of races) {
      rows.push([
        this.tableService.createDate(race.session_start_time, "MMM d, y, h:mm:ss a"),
        this.tableService.createCell(race.series_name),
        this.tableService.createCell(race.track.track_name),
        this.tableService.createCell(race.start_position, true),
        this.tableService.createCell(race.finish_position, true),
        this.tableService.createCell(race.start_position - race.finish_position, true, race.start_position > race.finish_position, race.start_position < race.finish_position),
        this.tableService.createCell(race.incidents, true),
        this.tableService.createCell(race.newi_rating - race.oldi_rating, true, race.newi_rating > race.oldi_rating, race.newi_rating < race.oldi_rating),
        this.tableService.createCell((race.new_sub_level - race.old_sub_level) / 100, true, race.new_sub_level > race.old_sub_level, race.new_sub_level < race.old_sub_level),
        this.tableService.createButton(this.translateService.instant("Member.LastRacesPanel.Table.Result"), () => this.onClickResult(race), true),
      ]);
    }
    return rows;
  }

  onClickResult(race: RecentRace) {
    this.notificationService.error("This feature is not implemented yet." + race.subsession_id);
  }
}
