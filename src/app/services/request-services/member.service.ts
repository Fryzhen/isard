import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {RequestService} from "./request.service";
import {Member, Members} from "../iracing-entities";

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
    const params = new URLSearchParams();
    params.append("cust_ids", cust_ids.join(","));
    if (include_licenses) {
      params.append("include_licenses", include_licenses.toString());
    }
    return this.request<Members>("get", params).pipe(
      map((response: Members) => {
        return response.members;
      })
    );
  }
}
