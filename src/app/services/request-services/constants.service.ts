import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  baseUrl: string = environment.apiUrl + '/constants';

  constructor(
    private http: HttpClient,
  ) {
  }

  getConstansCategories(): Observable<any> {
    return this.http.get(this.baseUrl + '/categories');
  }

  getConstansDivisions(): Observable<any> {
    return this.http.get(this.baseUrl + '/divisions');
  }

  getConstansEventTypes(): Observable<any> {
    return this.http.get(this.baseUrl + '/event_types');
  }
}

