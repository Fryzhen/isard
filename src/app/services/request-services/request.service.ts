import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export abstract class RequestService {
  protected baseUrl: string = environment.apiUrl;
  protected readonly http = inject(HttpClient);

  protected constructor(urlPart: string) {
    this.baseUrl = `${environment.apiUrl}/${urlPart}`;
  }

  protected request<T>(endpoint: string, searchParams: URLSearchParams): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}?${searchParams.toString()}`;
    return this.http.get<T>(url);
  }
}
