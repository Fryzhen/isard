import {Component, inject, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {BoxComponent} from "../../../../../components/cosmetics/box/box.component";
import {TableComponent} from "../../../../../components/cosmetics/table/table.component";
import {TableCell, TableHeader, TableService} from "../../../../../services/app-services/table.service";
import {NotificationService} from "../../../../../services/app-services/notification.service";
import {RecentRace} from "../../../../../services/iracing-entities";
import {StatsService} from "../../../../../services/request-services/stats.service";
import {LoggerService} from "../../../../../services/app-services/logger.service";
import {LoadingScreenComponent} from "../../../../../components/cosmetics/loading-screen/loading-screen.component";

@Component({
  standalone: true,
  selector: "isard-member-last-races",
  imports: [CommonModule, TranslatePipe, BoxComponent, TableComponent, LoadingScreenComponent],
  templateUrl: "./member-last-races.component.html",
  styleUrl: "./member-last-races.component.scss"
})
export class MemberLastRacesComponent implements OnInit, OnChanges {
  @Input() custId!: number;
  rows: TableCell[][] | undefined;
  header: TableHeader[] | undefined;
  private readonly tableService = inject(TableService);
  private readonly notificationService = inject(NotificationService);
  private readonly translateService = inject(TranslateService);
  private readonly statsService = inject(StatsService);
  private readonly loggerService = inject(LoggerService);

  ngOnInit(): void {
    this.loadMemberData(this.custId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['custId'] && !changes['custId'].firstChange) {
      this.loadMemberData(this.custId);
    }
  }

  getHeader(): TableHeader[] {
    return [
      this.tableService.createHeader(this.translateService.instant("Member.LastRacesPanel.Table.Date"), true),
      this.tableService.createHeader(this.translateService.instant("Member.LastRacesPanel.Table.Series"), true),
      this.tableService.createHeader(this.translateService.instant("Member.LastRacesPanel.Table.Track"), true),
      this.tableService.createHeader(this.translateService.instant("Member.LastRacesPanel.Table.Start"), true, {"text-center": true}),
      this.tableService.createHeader(this.translateService.instant("Member.LastRacesPanel.Table.Finish"), true, {"text-center": true}),
      this.tableService.createHeader(this.translateService.instant("Member.LastRacesPanel.Table.PosDif"), true, {"text-center": true}),
      this.tableService.createHeader(this.translateService.instant("Member.LastRacesPanel.Table.Incidents"), false, {"text-center": true}),
      this.tableService.createHeader(this.translateService.instant("Member.LastRacesPanel.Table.IrDif"), true, {"text-center": true}),
      this.tableService.createHeader(this.translateService.instant("Member.LastRacesPanel.Table.SrDif"), true, {"text-center": true}),
      this.tableService.createHeader("")
    ];
  }

  getRows(races: RecentRace[]): TableCell[][] {
    const rows: TableCell[][] = [];
    races.sort((a, b) => {
      return new Date(b.session_start_time).getTime() - new Date(a.session_start_time).getTime();
    });
    for (const race of races) {
      rows.push([
        this.tableService.createDate(race.session_start_time, "short"),
        this.tableService.createCell(race.series_name), this.tableService.createCell(race.track.track_name),
        this.tableService.createCell(race.start_position, {
          "text-center": true,
          "podium": race.start_position >= 1 && race.start_position <= 3,
          "first": race.start_position === 1,
          "second": race.start_position === 2,
          "third": race.start_position === 3
        }),
        this.tableService.createCell(race.finish_position, {
          "text-center": true,
          "podium": race.finish_position >= 1 && race.finish_position <= 3,
          "first": race.finish_position === 1,
          "second": race.finish_position === 2,
          "third": race.finish_position === 3
        }),
        this.tableService.createCell(race.start_position - race.finish_position, {
          "text-center": true,
          "positive": race.finish_position < race.start_position,
          "negative": race.finish_position > race.start_position,
        }),
        this.tableService.createCell(`${race.incidents}x`, {"text-center": true}),
        this.tableService.createCell(race.newi_rating - race.oldi_rating, {
          "text-center": true,
          "positive": race.oldi_rating < race.newi_rating,
          "negative": race.oldi_rating > race.newi_rating
        }),
        this.tableService.createCell((race.new_sub_level - race.old_sub_level) / 100, {
          "text-center": true,
          "positive": race.old_sub_level < race.new_sub_level,
          "negative": race.old_sub_level > race.new_sub_level
        }),
        this.tableService.createButton(this.translateService.instant("Member.LastRacesPanel.Table.Result"), () => this.onClickResult(race), {"text-center": true}),]);
    }
    return rows;
  }

  onClickResult(race: RecentRace) {
    this.notificationService.error("This feature is not implemented yet." + race.subsession_id);
  }

  private loadMemberData(custId: number) {
    this.statsService.getRecentRaces(custId).subscribe({
      next: (races: RecentRace[]) => {
        this.header = this.getHeader();
        this.rows = this.getRows(races);
      }, error: (error: string) => {
        this.notificationService.error(this.translateService.instant("Member.Errors.ImpossibleGetData"));
        this.loggerService.error(error);
      }
    });
  }
}
