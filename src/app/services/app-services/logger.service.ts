import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  log(message: string): void {
    console.log(`Log: ${message}`);
  }

  warn(message: string): void {
    console.warn(`Warning: ${message}`);
  }

  error(message: string): void {
    console.error(`Error: ${message}`);
  }

  info(message: string): void {
    console.info(`Info: ${message}`);
  }
}
