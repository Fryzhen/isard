import {Injectable} from '@angular/core';
import {RequestService} from './request.service';
import {Category, Division, EventType} from "../iracing-entities";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConstantsService extends RequestService {
  private categories: Observable<Category[]> | undefined;
  private divisions: Observable<Division[]> | undefined;
  private eventTypes: Observable<EventType[]> | undefined;

  constructor() {
    super('constants');
  }

  public getCategories(): Observable<Category[]> {
    this.categories ??= this.request<Category[]>('categories', new URLSearchParams())
    return this.categories;
  }

  public getDivisions(): Observable<Division[]> {
    this.divisions ??= this.request<Division[]>('divisions', new URLSearchParams())
    return this.divisions;
  }

  public getEventTypes(): Observable<EventType[]> {
    this.eventTypes ??= this.request<EventType[]>('event_types', new URLSearchParams())
    return this.eventTypes;
  }
}
