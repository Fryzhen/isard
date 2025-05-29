import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  baseUrl: string = environment.apiUrl + '/stats';

  constructor(
    private http: HttpClient,
  ) {
  }

  getRecentRaces(cust_id: string): Promise<any> {
    return this.http.get(`${this.baseUrl}/member_recent_races?cust_id=${cust_id}`)
  }
}
