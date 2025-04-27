import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Driver } from '../../entities/Member';

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  baseUrl: string = environment.apiUrl + '/lookup';

  getLookupClubHistory(season_year: number, season_quarter: number): Promise<any> {
    return fetch(`${this.baseUrl}/club_history?season_year=${season_year}&season_quarter=${season_quarter}`).then(r => r.json());
  }

  getLookupCountries(): Promise<any> {
    return fetch(`${this.baseUrl}/countries`).then(r => r.json());
  }

  getLookupDrivers(search_term: string, league_id?: number): Promise<Driver[]> {
    const league_id_param = league_id ? `&league_id=${league_id}` : '';
    return fetch(`${this.baseUrl}/drivers?search_term=${search_term}${league_id_param}`).then(r => r.json());
  }
}
