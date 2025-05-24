import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Driver} from '../entities/driver/Member';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  baseUrl: string = environment.apiUrl + '/lookup';

  constructor(
    private http: HttpClient,
  ) {
  }

  getLookupClubHistory(season_year: number, season_quarter: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/club_history?season_year=${season_year}&season_quarter=${season_quarter}`);
  }

  getLookupCountries(): Observable<any> {
    return this.http.get(`${this.baseUrl}/countries`);
  }

  getLookupDrivers(search_term: string, league_id?: number): Observable<Driver[]> {
    const league_id_param = league_id ? `&league_id=${league_id}` : '';
    return this.http.get<Driver[]>(`${this.baseUrl}/drivers?search_term=${search_term}${league_id_param}`)
  }
}
