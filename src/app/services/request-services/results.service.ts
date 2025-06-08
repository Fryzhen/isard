import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Category, EventType, SearchSeries} from "../iracing-entities";
import {RequestService} from "./request.service";

@Injectable({
  providedIn: "root",
})
export class ResultsService extends RequestService {
  constructor() {
    super("results");
  }

  // getResult(subsession: number, include_licenses?: boolean): Observable<Object> {
  //   const include_licenses_param = include_licenses ? `&include_licenses=${include_licenses}` : '';
  //   return this.http.get(`${this.baseUrl}/get?subsession=${subsession}${include_licenses_param}`)
  // }

  searchSeries(cust_id: number, season_year: number, season_quarter: number, config?: SearchSeriesConfig): Observable<SearchSeries[]> {
    const params = new URLSearchParams;
    params.set("cust_id", cust_id.toString());
    params.set("season_year", season_year.toString());
    params.set("season_quarter", season_quarter.toString());
    if (config) {
      if (config.race_week_num) {
        params.set("race_week_num", config.race_week_num.toString());
      }
      if (config.series_id) {
        params.set("series_id", config.series_id.toString());
      }
      if (config.official_only !== undefined) {
        params.set("official_only", config.official_only.toString());
      }
      if (config.event_types) {
        params.set("event_types", config.event_types.map((et: EventType) => et.value.toString()).join(","));
      }
      if (config.category_ids) {
        params.set("category_ids", config.category_ids.map((cat: Category) => cat.value.toString()).join(","));
      }
    }
    console.log(params.toString());
    return this.request<SearchSeries[]>('search_series', params);
  }
}

export interface SearchSeriesConfig {
  race_week_num?: number,
  series_id?: number,
  official_only?: boolean,
  event_types?: EventType[],
  category_ids?: Category[],
}
