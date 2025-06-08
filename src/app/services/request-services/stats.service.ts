import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {RequestService} from "./request.service";
import {MemberCareer, MemberRecentRaces, MemberYearly, RecentRace, StatCarrer, StatYearly} from "../iracing-entities";

@Injectable({
  providedIn: "root",
})
export class StatsService extends RequestService {
  constructor() {
    super("stats");
  }

  getRecentRaces(cust_id: number): Observable<RecentRace[]> {
    const params = new URLSearchParams();
    params.set("cust_id", cust_id.toString());
    return this.request<MemberRecentRaces>('member_recent_races', params).pipe(
      map((request: MemberRecentRaces) => {
          return request.races;
        }
      )
    );
  }

  getCareerStats(cust_id: number): Observable<StatCarrer[]> {
    const params = new URLSearchParams();
    params.set("cust_id", cust_id.toString());
    return this.request<MemberCareer>('member_career', params).pipe(
      map((request: MemberCareer) => {
          return request.stats;
        }
      )
    );
  }

  getYearlyStats(cust_id: number): Observable<StatYearly[]> {
    const params = new URLSearchParams();
    params.set("cust_id", cust_id.toString());
    return this.request<MemberYearly>('member_yearly', params).pipe(
      map((request: MemberYearly) => {
          return request.stats;
        }
      )
    );
  }
}
