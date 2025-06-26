import {Component, inject} from "@angular/core";
import {BackgroundComponent} from "../../components/cosmetics/background/background.component";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {Title} from "@angular/platform-browser";

@Component({
  standalone: true,
  selector: "isard-home",
  templateUrl: "./home.component.html",
  imports: [BackgroundComponent, TranslatePipe],
  styleUrl: "./home.component.scss"
})
export class HomeComponent {
  images = ["./assets/background/double-ferrari.jpg", "./assets/background/inside-ir18.jpg", "./assets/background/nascar-drift.jpg", "./assets/background/w12-sunset.jpg", "./assets/background/nascar-race.jpg",];
  private readonly titleService = inject(Title);
  private readonly translateService = inject(TranslateService);

  constructor() {
    this.translateService.get("Home.Title").subscribe(title => {
      this.titleService.setTitle(title);
    })
  }
}
