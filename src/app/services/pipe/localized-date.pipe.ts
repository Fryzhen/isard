import {DatePipe} from "@angular/common";
import {inject, Pipe, PipeTransform} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Pipe({
  standalone: true,
  name: "localizedDate",
  pure: false
})
export class LocalizedDatePipe implements PipeTransform {
  private readonly translateService = inject(TranslateService);

  transform(value: Date, pattern = "mediumDate"): string | null {
    const datePipe: DatePipe = new DatePipe(this.translateService.currentLang);
    return datePipe.transform(value, pattern);
  }
}
