import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EventType, Race} from './iracing-entities';

export interface SearchSeriesConfig {
  race_week_num: number,

  series_id?: number,

  official_only?: boolean,

  event_types?: EventType[],

  category_ids?: number[],
}

export interface SearchSeriesResponse {
  type: string;

  data: {
    chunk_info: {
      base_download_url: string;
      chunk_file_names: string[];
      chunk_size: number;
      num_chunks: number;
      rows: number;
    }
  };
}

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  baseUrl: string = environment.apiUrl + '/results';

  constructor(
    private http: HttpClient,
  ) {
  }

  // getResult(subsession: number, include_licenses?: boolean): Observable<Object> {
  //   const include_licenses_param = include_licenses ? `&include_licenses=${include_licenses}` : '';
  //   return this.http.get(`${this.baseUrl}/get?subsession=${subsession}${include_licenses_param}`)
  // }

  searchSeries(cust_id: number, season_year: number, season_quarter: number, config?: SearchSeriesConfig): Observable<Race[]> {
    console.log('Search Series', cust_id, season_year, season_quarter);
    let configString = '';
    if (config) {
      const race_week_num = config.race_week_num ? `&race_week_num=${config.race_week_num}` : '';
      const series_id = config.series_id ? `&series_id=${config.series_id}` : '';
      const official_only = config.official_only ? `&official_only=${config.official_only}` : '';
      const event_types = config.event_types ? `&event_types=${config.event_types.join(',')}` : '';
      const category_ids = config.category_ids ? `&category_ids=${config.category_ids.join(',')}` : '';
      configString = `${series_id}${official_only}${event_types}${category_ids}${race_week_num}`;
    }
    return this.http.get<Race[]>(`${this.baseUrl}/search_series?cust_id=${cust_id}&season_year=${season_year}&season_quarter=${season_quarter}${configString}`);
  }
}
