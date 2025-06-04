import {Component, Input} from "@angular/core";
import {RecentRace} from "../../../../../services/request-services/iracing-entities";
import {CommonModule, NgForOf} from "@angular/common";
import {LoadingScreenComponent} from "../../../../../components/loading-screen/loading-screen.component";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {LocalizedDatePipe} from "../../../../../services/app-services/localized-date.pipe";
import {BoxComponent} from "../../../../../components/box/box.component";
import {TableComponent} from "../../../../../components/table/table.component";
import {TableCell, TableHeader, TableService} from "../../../../../services/app-services/table.service";
import {NotificationService} from "../../../../../services/app-services/notification.service";

@Component({
  standalone: true,
  selector: "isard-member-last-races",
  imports: [NgForOf, CommonModule, LoadingScreenComponent, TranslatePipe, LocalizedDatePipe, BoxComponent, TableComponent],
  templateUrl: "./member-last-races.component.html",
  styleUrl: "./member-last-races.component.scss"
})
export class MemberLastRacesComponent {
  @Input() races: RecentRace[] | undefined = undefined;

  constructor(
    private readonly translate: TranslateService,
    private readonly tableService: TableService,
    private readonly notificationService: NotificationService,
  ) {
  }

  getHeader(): TableHeader[] {
    return [
      this.tableService.createHeader(this.translate.instant("Member.LastRacesPanel.Table.Date")),
      this.tableService.createHeader(this.translate.instant("Member.LastRacesPanel.Table.Car")),
      this.tableService.createHeader(this.translate.instant("Member.LastRacesPanel.Table.Track")),
      this.tableService.createHeader(this.translate.instant("Member.LastRacesPanel.Table.Start"), true),
      this.tableService.createHeader(this.translate.instant("Member.LastRacesPanel.Table.Finish"), true),
      this.tableService.createHeader(this.translate.instant("Member.LastRacesPanel.Table.PosDif"), true),
      this.tableService.createHeader(this.translate.instant("Member.LastRacesPanel.Table.Incidents"), true),
      this.tableService.createHeader(this.translate.instant("Member.LastRacesPanel.Table.IrDif"), true),
      this.tableService.createHeader(this.translate.instant("Member.LastRacesPanel.Table.SrDif"), true),
      this.tableService.createHeader(""),
    ];

  }

  getRows(): TableCell[][] {
    const rows: TableCell[][] = [];
    if (!this.races) {
      return rows;
    }
    for (const race of this.races) {
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
        this.tableService.createButton(this.translate.instant("Member.LastRacesPanel.Table.Result"), () => this.onClickResult(race), true),
      ]);
    }
    return rows;
  }

  onClickResult(race: RecentRace) {
    this.notificationService.error("This feature is not implemented yet." + race.subsession_id);
  }
}
