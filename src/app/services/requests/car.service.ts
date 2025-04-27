import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  baseUrl: string = environment.apiUrl + '/car';

  getCarAssets(): Promise<any> {
    return fetch(`${this.baseUrl}/assets`).then(r => r.json());
  }

  getCar(): Promise<any> {
    return fetch(`${this.baseUrl}/get`).then(r => r.json());
  }
}

