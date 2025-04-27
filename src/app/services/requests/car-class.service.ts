import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarClassService {
  baseUrl: string = environment.apiUrl + '/carclass';

  getCarClass(): Promise<any> {
    return fetch(`${this.baseUrl}/get`).then(r => r.json());
  }
}

