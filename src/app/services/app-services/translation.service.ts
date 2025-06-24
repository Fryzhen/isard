import {inject, Injectable} from "@angular/core";
import {registerLocaleData} from "@angular/common";
import localeEn from "@angular/common/locales/en";
import localeFr from "@angular/common/locales/fr";
import {TranslateService} from "@ngx-translate/core";

export enum Language {
  English = "gb",
  French = "fr"
}

@Injectable({
  providedIn: "root"
})
export class TranslationService {
  selectedLanguage: Language = Language.English;
  private readonly translate = inject(TranslateService);

  public init() {
    this.translate.addLangs([Language.English, Language.French]);
    this.translate.setDefaultLang(this.selectedLanguage);
    registerLocaleData(localeFr, Language.French);
    registerLocaleData(localeEn, Language.English);

    this.selectedLanguage = localStorage.getItem("selectedLanguage") as Language
      ?? this.translate.getBrowserLang() as Language
      ?? Language.English;
    this.setLanguage(this.selectedLanguage);
  }

  public setLanguage(language: Language) {
    localStorage.setItem("selectedLanguage", language);
    this.selectedLanguage = language;
    this.translate.use(language);
  }
}
