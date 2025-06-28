import {Component, inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RecentRace, SearchSeries} from "../../../../../../services/iracing-entities";
import {TableComponent} from "../../../../../../components/cosmetics/table/table.component";
import {TableCell, TableHeader, TableService} from "../../../../../../services/app-services/table.service";
import {TranslateService} from "@ngx-translate/core";
import {NotificationService} from "../../../../../../services/app-services/notification.service";

@Component({
  selector: 'isard-member-all-races-results',
  imports: [
    TableComponent
  ],
  templateUrl: './member-all-races-results.component.html',
  styleUrl: './member-all-races-results.component.scss'
})
export class MemberAllRacesResultsComponent implements OnInit, OnChanges {
  private readonly tableService = inject(TableService);
  private readonly translateService = inject(TranslateService);
  private readonly notificationService = inject(NotificationService);

  @Input() series!: SearchSeries[];

  rows: TableCell[][] | undefined;
  header: TableHeader[] | undefined;

  ngOnInit() {
    this.header = this.getHeader()
    this.rows = this.getRows(this.series)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["series"]) {
      this.getHeader()
      this.getRows(this.series)
    }
  }

  getHeader(): TableHeader[] {
    return [
      this.tableService.createHeader(this.translateService.instant("Member.AllRacesPanel.Table.Date"), true),
      this.tableService.createHeader(this.translateService.instant("Member.AllRacesPanel.Table.EventType"), true),
      this.tableService.createHeader(this.translateService.instant("Member.AllRacesPanel.Table.Series")),
      this.tableService.createHeader(this.translateService.instant("Member.AllRacesPanel.Table.Car")),
      this.tableService.createHeader(this.translateService.instant("Member.AllRacesPanel.Table.Track")),
      this.tableService.createHeader(this.translateService.instant("Member.AllRacesPanel.Table.StartPosition"),true, {"text-center": true}),
      this.tableService.createHeader(this.translateService.instant("Member.AllRacesPanel.Table.FinishPosition"),true, {"text-center": true}),
      this.tableService.createHeader(this.translateService.instant("Member.AllRacesPanel.Table.Incidents"),true, {"text-center": true}),
      this.tableService.createHeader(""),
    ];
  }

  getRows(races: SearchSeries[]): TableCell[][] {
    const rows: TableCell[][] = [];
    races.sort((a, b) => {
      return new Date(b.start_time).getTime() - new Date(a.start_time).getTime();
    });
    for (const race of races) {
      rows.push([
        this.tableService.createDate(race.start_time, "short"),
        this.tableService.createCell(race.event_type_name.substring(0, 1).toUpperCase(), {
          "text-center": true,
          "event-type": true,
          [race.event_type_name.trim().replace(' ', '-').toLowerCase()]: true
        }),
        this.tableService.createCell(race.series_name),
        this.tableService.createCell(race.car_name),
        this.tableService.createCell(race.track.track_name),
        this.tableService.createCell(
          race.starting_position_in_class !== 0 ? race.starting_position_in_class : "-"
          , {
            "text-center": true,
            "podium": race.starting_position_in_class >= 1 && race.starting_position_in_class <= 3,
            "first": race.starting_position_in_class === 1,
            "second": race.starting_position_in_class === 2,
            "third": race.starting_position_in_class === 3
          }),
        this.tableService.createCell(
          race.finish_position_in_class !== 0 ? race.finish_position_in_class : "-"
          , {
            "text-center": true,
            "podium": race.finish_position_in_class >= 1 && race.finish_position_in_class <= 3,
            "first": race.finish_position_in_class === 1,
            "second": race.finish_position_in_class === 2,
            "third": race.finish_position_in_class === 3
          }),
        this.tableService.createCell(`${race.incidents}x`, {"text-center": true}),
        this.tableService.createButton(this.translateService.instant("Member.AllRacesPanel.Table.Result"), () => this.onClickResult(race), {"text-center": true}),
      ]);
    }
    return rows;
  }

  onClickResult(race: SearchSeries) {
    this.notificationService.error("This feature is not implemented yet." + race.subsession_id);
  }
}
