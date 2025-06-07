import {Component, inject} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";
import {TranslationService} from "../../services/app-services/translation.service";

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

  setLanguage(language: string) {
    this.translationService.setLanguage(language);
  }
}
