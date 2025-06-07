import {Injectable} from "@angular/core";
import {CareerStats, RecentRace, YearStats} from "./iracing-entities";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {RequestService} from "./request.service";

@Injectable({
  providedIn: "root",
})
export class StatsService extends RequestService {
  constructor() {
    super("stats");
  }

  getRecentRaces(cust_id: number): Observable<RecentRace[]> {
    return this.http.get<{ races: RecentRace[] }>(`${this.baseUrl}/member_recent_races?cust_id=${cust_id}`).pipe(
      map((request: { races: RecentRace[] }) => {
          return request.races;
        }
      )
    );
  }

  getCareerStats(cust_id: number): Observable<CareerStats[]> {
    return this.http.get<{ stats: CareerStats[] }>(`${this.baseUrl}/member_career?cust_id=${cust_id}`).pipe(
      map((request: { stats: CareerStats[] }) => {
          return request.stats;
        }
      )
    );
  }

  getYearlyStats(cust_id: number): Observable<YearStats[]> {
    return this.http.get<{ stats: YearStats[] }>(`${this.baseUrl}/member_yearly?cust_id=${cust_id}`).pipe(
      map((request: { stats: YearStats[] }) => {
          return request.stats;
        }
      )
    );
  }
}
