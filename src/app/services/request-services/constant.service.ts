import {Injectable} from '@angular/core';
import {RequestService} from './request.service';
import {Category, Division, EventType} from "../iracing-entities";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConstantService extends RequestService {
  private categories: Category[] = [];
  private divisions: Division[] = [];
  private eventTypes: EventType[] = [];

  constructor() {
    super('constant');
  }

  public getCategories(): Observable<Category[]> {
    if (this.categories) {
      return new Observable<Category[]>(subscriber => {
        subscriber.next(this.categories);
        subscriber.complete();
      });
    } else {
      return this.request<Category[]>('categories', new URLSearchParams());
    }
  }

  public getDivisions(): Observable<Division[]> {
    if (this.divisions) {
      return new Observable<Division[]>(subscriber => {
        subscriber.next(this.divisions);
        subscriber.complete();
      });
    } else {
      return this.request<Division[]>('divisions', new URLSearchParams());
    }
  }

  public getEventTypes(): Observable<EventType[]> {
    if (this.eventTypes) {
      return new Observable<EventType[]>(subscriber => {
        subscriber.next(this.eventTypes);
        subscriber.complete();
      });
    } else {
      return this.request<EventType[]>('event_types', new URLSearchParams());
    }
  }
}
