import {Injectable} from "@angular/core";
import {Member} from "./iracing-entities";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {RequestService} from "./request.service";

@Injectable({
  providedIn: "root",
})
export class MemberService extends RequestService {
  constructor() {
    super("member");
  }

  getMember(cust_id: number, include_licenses?: boolean): Observable<Member> {
    return this.getMemberList([cust_id], include_licenses).pipe(
      map((members: Member[]) => {
          if (members.length > 0) {
            return members[0];
          } else {
            throw new Error("Member not found");
          }
        }
      ));
  }

  getMemberList(cust_ids: number[], include_licenses?: boolean): Observable<Member[]> {
    const cust_ids_strings = cust_ids.join(",");
    const include_licenses_param = include_licenses ? `&include_licenses=${include_licenses}` : "";
    return this.http.get<{
      members: Member[]
    }>(`${this.baseUrl}/get?cust_ids=${cust_ids_strings}${include_licenses_param}`).pipe(
      map((response: { members: Member[] }) => {
        return response.members;
      })
    );
  }
}
