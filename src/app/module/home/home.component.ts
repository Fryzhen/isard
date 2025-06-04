import {Component} from "@angular/core";
import {BackgroundComponent} from "../../components/background/background.component";
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

  constructor(private titleService: Title, private translateService: TranslateService,) {
    this.titleService.setTitle(this.translateService.instant("Home.Title"));
  }
}
