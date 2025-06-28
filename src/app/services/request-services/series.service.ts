import { Injectable } from '@angular/core';
import {RequestService} from "./request.service";
import {Observable} from "rxjs";
import {Series} from "../iracing-entities";

@Injectable({
  providedIn: 'root'
})
export class SeriesService extends RequestService {
  constructor() {
    super("series");
  }

  getSeries(): Observable<Series[]> {
    return this.request<Series[]>("get", new URLSearchParams())
  }
}
