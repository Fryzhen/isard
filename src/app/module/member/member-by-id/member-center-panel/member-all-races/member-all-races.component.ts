import {Component, inject, Input} from "@angular/core";
import {BoxComponent} from "../../../../../components/cosmetics/box/box.component";
import {LoadingScreenComponent} from "../../../../../components/cosmetics/loading-screen/loading-screen.component";
import {TranslatePipe} from "@ngx-translate/core";
import {ResultsService} from "../../../../../services/request-services/results.service";
import {SearchSeries} from "../../../../../services/iracing-entities";
import {DividerComponent} from "../../../../../components/cosmetics/divider/divider.component";
import {
  MemberAllRacesParameters,
  MemberAllRacesParametersComponent
} from "./member-all-races-parameters/member-all-races-parameters.component";
import {MemberAllRacesResultsComponent} from "./member-all-races-results/member-all-races-results.component";
import {MemberAllRacesFilterComponent} from "./member-all-races-filter/member-all-races-filter.component";

@Component({
  standalone: true,
  selector: "isard-member-all-races",
  imports: [BoxComponent, LoadingScreenComponent, TranslatePipe, DividerComponent, MemberAllRacesParametersComponent, MemberAllRacesResultsComponent, MemberAllRacesFilterComponent],
  templateUrl: "./member-all-races.component.html",
  styleUrl: "./member-all-races.component.scss"
})
export class MemberAllRacesComponent {
  @Input() custId!: number;
  series?: SearchSeries[] = undefined;
  loadingSeries = false;
  filteredSeries?: SearchSeries[] = undefined;
  protected readonly resultService = inject(ResultsService);

  findRaces(params: MemberAllRacesParameters) {
    this.loadingSeries = true;
    this.resultService.searchSeries(this.custId, params.year, params.season, {
      event_types: params.eventType,
      category_ids: params.categories,
      series_id: params.serie ? params.serie : undefined,
    }).subscribe({
      next: (data) => {
        this.loadingSeries = false;
        this.series = data;
        this.filteredSeries = data;
      }, error: (err) => {
        console.error(err);
      }
    });
  }

  onFilter($event: SearchSeries[]) {
    this.filteredSeries = $event;
  }
}
