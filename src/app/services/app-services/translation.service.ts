import {Injectable} from "@angular/core";
import {registerLocaleData} from "@angular/common";
import localeEn from "@angular/common/locales/en";
import localeFr from "@angular/common/locales/fr";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: "root"
})
export class TranslationService {
  selectedLanguage = "en";

  constructor(
    private readonly translate: TranslateService
  ) {
  }

  public init() {
    this.translate.addLangs(["fr", "en"]);
    this.translate.setDefaultLang(this.selectedLanguage);
    registerLocaleData(localeFr, "fr");
    registerLocaleData(localeEn, "en");

    this.selectedLanguage = localStorage.getItem("selectedLanguage") ?? this.translate.getBrowserLang() ?? "en";
    this.setLanguage(this.selectedLanguage);
  }

  public setLanguage(language: string) {
    localStorage.setItem("selectedLanguage", language);
    this.selectedLanguage = language;
    this.translate.use(language);
  }
}
