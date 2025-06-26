import {Component, inject} from "@angular/core";
import {Language, TranslationService} from "../../../services/app-services/translation.service";
import {FlagComponent} from "../../cosmetics/flag/flag.component";

@Component({
  standalone: true,
  selector: "isard-language",
  imports: [
    FlagComponent
  ],
  templateUrl: "./language.component.html",
  styleUrl: "./language.component.scss"
})
export class LanguageComponent {
  protected readonly Language = Language;
  private readonly translationService = inject(TranslationService);

  setLanguage(language: Language) {
    this.translationService.setLanguage(language);
  }
}
