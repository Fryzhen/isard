import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  baseUrl: string = environment.apiUrl + '/constants';

  getConstansCategories(): Promise<any> {
    return fetch(`${this.baseUrl}/categories`).then(r => r.json());
  }

  getConstansDivisions(): Promise<any> {
    return fetch(`${this.baseUrl}/divisions`).then(r => r.json());
  }

  getConstansEventTypes(): Promise<any> {
    return fetch(`${this.baseUrl}/event_types`).then(r => r.json());
  }
}

