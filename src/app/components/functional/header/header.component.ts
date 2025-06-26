import {Component} from "@angular/core";
import {NavbarComponent} from "../navbar/navbar.component";
import {NotificationComponent} from "../notification/notification.component";

@Component({
  standalone: true,
  selector: "isard-header",
  imports: [
    NavbarComponent,
    NotificationComponent
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss"
})
export class HeaderComponent {

}
