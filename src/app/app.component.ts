import {Component, inject} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./components/header/header.component";
import {TranslationService} from "./services/app-services/translation.service";

@Component({
  standalone: true,
  selector: "isard-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [
    RouterOutlet,
    CommonModule,
    HeaderComponent
  ]
})
export class AppComponent {
  private readonly translationService = inject(TranslationService);

  constructor() {
    this.translationService.init();
  }

}
