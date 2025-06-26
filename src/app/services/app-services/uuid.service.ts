import {Injectable} from "@angular/core";
import {v4} from "uuid";

@Injectable({
  providedIn: "root"
})
export class UuidService {
  public generate(): string {
    return v4();
  }
}
