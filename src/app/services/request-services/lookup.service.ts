import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Driver, Flair, RequestFlairs} from "../iracing-entities";
import {RequestService} from "./request.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LookupService extends RequestService {
  private static flairs: Observable<Flair[]> | undefined;

  constructor() {
    super("lookup");
  }

  getDrivers(search_term: string, league_id?: number): Observable<Driver[]> {
    const params = new URLSearchParams();
    params.append("search_term", search_term);
    if (league_id) {
      params.append("league_id", league_id.toString());
    }
    return this.request<Driver[]>("drivers", params);
  }

  getFlairs(): Observable<Flair[]> {
    LookupService.flairs ??= this.request<RequestFlairs>("flairs", new URLSearchParams()).pipe(
      map((requestFlairs: RequestFlairs) => {
        return requestFlairs.flairs;
      }));
    return LookupService.flairs;
  }
}
