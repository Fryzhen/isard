import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Member} from '../entities/Member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  baseUrl: string = environment.apiUrl + '/member';

  getMember(cust_id: number, include_licenses?: boolean): Promise<Member> {
    return this.getMemberList([cust_id], include_licenses)[0];
  }

  getMemberList(cust_ids: number[], include_licenses?: boolean): Promise<Member[]> {
    const cust_ids_strings = cust_ids.join(',');
    const include_licenses_param = include_licenses ? `&include_licenses=${include_licenses}` : '';
    return fetch(`${this.baseUrl}/get?cust_id=${cust_ids_strings}${include_licenses_param}`)
    .then(r => r.json())
    .then(r => r['members']);
  }

  getMemberHistory(): Promise<any> {
    return fetch(`${this.baseUrl}/history`).then(r => r.json());
  }

  getMemberLeagueHistory(): Promise<any> {
    return fetch(`${this.baseUrl}/league_history`).then(r => r.json());
  }

  getMemberLeagueHistoryById(league_id: number): Promise<any> {
    return fetch(`${this.baseUrl}/league_history?league_id=${league_id}`).then(r => r.json());
  }
}
