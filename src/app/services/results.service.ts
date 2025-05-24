import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {SearchSeriesConfig} from '../entities/api/Configs';

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  baseUrl: string = environment.apiUrl + '/results';

  constructor(
    private http: HttpClient,
  ) {
  }

  getResult(subsession: number, include_licenses?: boolean): Promise<any> {
    const include_licenses_param = include_licenses ? `&include_licenses=${include_licenses}` : '';
    return this.http.get(`${this.baseUrl}/get?subsession=${subsession}${include_licenses_param}`)
  }

  searchSeries(cust_id: string, season_year: number, season_quarter: number, race_week_num: number, config?: SearchSeriesConfig): Promise<any> {
    var configString = "";
    if (config) {
      const series_id = config.series_id ? `&series_id=${config.series_id}` : '';
      const official_only = config.official_only ? `&official_only=${config.official_only}` : '';
      const event_types = config.event_types ? `&event_types=${config.event_types.join(',')}` : '';
      const category_ids = config.category_ids ? `&category_ids=${config.category_ids.join(',')}` : '';
      configString = `${series_id}${official_only}${event_types}${category_ids}`;
    }
    this.http.get(`${this.baseUrl}/search_series?cust_id=${cust_id}&season_year=${season_year}&season_quarter=${season_quarter}&race_week_num=${race_week_num}${configString}`)
    .subscribe((response) => {
      return null
    });
  }
}
