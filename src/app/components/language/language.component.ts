import {Component, inject} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";
import {Language, TranslationService} from "../../services/app-services/translation.service";

@Component({
  standalone: true,
  selector: "isard-language",
  imports: [
    NgOptimizedImage
  ],
  templateUrl: "./language.component.html",
  styleUrl: "./language.component.scss"
})
export class LanguageComponent {
  private readonly translationService = inject(TranslationService);

  protected readonly Language = Language;

  setLanguage(language: Language) {
    this.translationService.setLanguage(language);
  }
}
