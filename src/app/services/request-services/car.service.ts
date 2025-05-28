import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  baseUrl: string = environment.apiUrl + '/car';

  constructor(
    private http: HttpClient,
  ) {
  }

  getCarAssets(): Observable<any> {
    return this.http.get(this.baseUrl + '/assets');
  }

  getCar(): Observable<any> {
    return this.http.get(this.baseUrl + '/get');
  }
}

