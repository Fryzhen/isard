import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CareerStats, Race, YearStats} from './iracing-entities';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  baseUrl: string = environment.apiUrl + '/stats';

  constructor(
    private http: HttpClient,
  ) {
  }

  getRecentRaces(cust_id: number): Observable<Race[]> {
    return this.http.get<{races: Race[]}>(`${this.baseUrl}/member_recent_races?cust_id=${cust_id}`).pipe(
      map((request: {races: Race[]}) => {
          return request.races;
        }
      )
    );
  }

  getCareerStats(cust_id: number): Observable<CareerStats[]> {
    return this.http.get<{stats: CareerStats[]}>(`${this.baseUrl}/member_career?cust_id=${cust_id}`).pipe(
      map((request: {stats: CareerStats[]}) => {
          return request.stats;
        }
      )
    );
  }

  getYearlyStats(cust_id: number): Observable<YearStats[]> {
    return this.http.get<{stats: YearStats[]}>(`${this.baseUrl}/member_yearly?cust_id=${cust_id}`).pipe(
      map((request: {stats: YearStats[]}) => {
          return request.stats;
        }
      )
    );
  }
}
