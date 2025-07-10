import {Component, EventEmitter, inject, Input, OnInit, Output} from "@angular/core";
import {SearchSeries} from "../../../../../../services/iracing-entities";
import {
  ItemPicklistComponent,
  PicklistItem
} from "../../../../../../components/input/item-picklist/item-picklist.component";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {CollapseComponent} from "../../../../../../components/cosmetics/collapse/collapse.component";

@Component({
  standalone: true,
  selector: "isard-member-all-races-filter",
  imports: [
    ItemPicklistComponent,
    TranslatePipe,
    CollapseComponent
  ],
  templateUrl: './member-all-races-filter.component.html',
  styleUrl: './member-all-races-filter.component.scss'
})
export class MemberAllRacesFilterComponent implements OnInit {
  @Input() series!: SearchSeries[];
  @Output() filter = new EventEmitter<SearchSeries[]>();
  tracks?: PicklistItem[] = undefined;
  cars?: PicklistItem[] = undefined;
  seriesInput?: PicklistItem[] = undefined;
  serieSelected: PicklistItem | null = null;
  carSelected: PicklistItem | null = null;
  trackSelected: PicklistItem | null = null;
  protected readonly translateService = inject(TranslateService);

  ngOnInit() {
    this.tracks = this.uniqueAndSorted(
      this.series.map((s) => ({
        label: `${s.track.track_name} - ${s.track.config_name}`,
        value: s.track.track_id
      } as PicklistItem))
    );
    this.cars = this.uniqueAndSorted(
      this.series.map((s) => ({
        label: s.car_name,
        value: s.car_id
      } as PicklistItem))
    );
    this.seriesInput = this.uniqueAndSorted(
      this.series.map((s) => ({
        label: s.series_name,
        value: s.series_id
      } as PicklistItem))
    );
  }

  onSerieSelected($event: PicklistItem | null) {
    this.serieSelected = $event;
    this.updateFilter();
  }

  onCarSelected($event: PicklistItem | null) {
    this.carSelected = $event;
    this.updateFilter();
  }

  onTrackSelected($event: PicklistItem | null) {
    this.trackSelected = $event;
    this.updateFilter();
  }

  private uniqueAndSorted(items: PicklistItem[]): PicklistItem[] {
    const map = new Map<number, PicklistItem>();
    items.forEach(item => map.set(item.value, item));
    return Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label));
  }

  private updateFilter() {
    this.filter.emit(this.series
      .filter((s) => {
        return this.serieSelected === null || this.serieSelected.value === s.series_id;
      })
      .filter((s) => {
        return this.carSelected === null || this.carSelected.value === s.car_id;
      })
      .filter((s) => {
        return this.trackSelected === null || this.trackSelected.value === s.track.track_id;
      })
    );
  }
}
