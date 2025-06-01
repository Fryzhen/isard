import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Member} from './iracing-entities';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  baseUrl: string = environment.apiUrl + '/member';

  constructor(
    private http: HttpClient,
  ) {
  }

  getMember(cust_id: number, include_licenses?: boolean): Observable<Member> {
    return this.getMemberList([cust_id], include_licenses).pipe(
      map((members: Member[]) => {
          if (members.length > 0) {
            return members[0];
          } else {
            throw new Error('Member not found');
          }
        }
      ));
  }

  getMemberList(cust_ids: number[], include_licenses?: boolean): Observable<Member[]> {
    const cust_ids_strings = cust_ids.join(',');
    const include_licenses_param = include_licenses ? `&include_licenses=${include_licenses}` : '';
    return this.http.get<{
      members: Member[]
    }>(`${this.baseUrl}/get?cust_ids=${cust_ids_strings}${include_licenses_param}`).pipe(
      map((response: { members: Member[] }) => {
        return response.members;
      })
    );
  }
}
