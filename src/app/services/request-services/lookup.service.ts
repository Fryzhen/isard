import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Driver} from "./iracing-entities";
import {RequestService} from "./request.service";

@Injectable({
  providedIn: "root",
})
export class LookupService extends RequestService {
  constructor() {
    super("lookup");
  }

  getLookupDrivers(search_term: string, league_id?: number): Observable<Driver[]> {
    const params = {
      search_term: search_term,
    }
    const league_id_param = league_id ? `&league_id=${league_id}` : '';
    return this.request<Driver[]>("drivers", params)
  }
}
