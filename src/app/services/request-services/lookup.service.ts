import {inject, Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Driver} from "./iracing-entities";

@Injectable({
  providedIn: "root",
})
export class LookupService {
  baseUrl: string = environment.apiUrl + "/lookup";
  private readonly http = inject(HttpClient);

  getLookupDrivers(search_term: string, league_id?: number): Observable<Driver[]> {
    const league_id_param = league_id ? `&league_id=${league_id}` : "";
    return this.http.get<Driver[]>(`${this.baseUrl}/drivers?search_term=${search_term}${league_id_param}`);
  }
}
