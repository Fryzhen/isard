import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarClassService {
  baseUrl: string = environment.apiUrl + '/carclass';

  constructor(
    private http: HttpClient,
  ) {
  }

  getCarClass(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get`);
  }
}

