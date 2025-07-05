import {Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {LicenceTileComponent} from "../../../../components/iracing/licence-tile/licence-tile.component";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {LocalizedDatePipe} from "../../../../services/pipe/localized-date.pipe";
import {BoxComponent} from "../../../../components/cosmetics/box/box.component";
import {Member, MemberRecap} from "../../../../services/iracing-entities";
import {FlagComponent} from "../../../../components/cosmetics/flag/flag.component";
import {MemberService} from "../../../../services/request-services/member.service";
import {LoggerService} from "../../../../services/app-services/logger.service";
import {StatsService} from "../../../../services/request-services/stats.service";
import {NotificationService} from "../../../../services/app-services/notification.service";
import {Title} from "@angular/platform-browser";

@Component({
  standalone: true,
  selector: "isard-member-info-panel",
  imports: [LicenceTileComponent, TranslatePipe, LocalizedDatePipe, BoxComponent, FlagComponent],
  templateUrl: "./member-info-panel.component.html",
  styleUrl: "./member-info-panel.component.scss"
})
export class MemberInfoPanelComponent implements OnInit, OnChanges {
  @Input() custId!: number;
  @Output() memberLoaded = new EventEmitter<boolean>();
  member?: Member = undefined;
  memberRecap?: MemberRecap = undefined;
  private readonly memberService = inject(MemberService);
  private readonly loggerService = inject(LoggerService);
  private readonly statsService = inject(StatsService);
  private readonly notificationService = inject(NotificationService);
  private readonly titleService = inject(Title);
  private readonly translateService = inject(TranslateService);

  ngOnInit(): void {
    this.loadMemberData(this.custId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['custId'] && !changes['custId'].firstChange) {
      this.loadMemberData(this.custId);
    }
  }

  loadMemberData(custId: number) {
    this.memberService.getMember(custId, true).subscribe({
      next: (member: Member) => {
        this.member = member;
        this.titleService.setTitle(this.translateService.instant("Member.MainPanel.Title") + " : " + this.member?.display_name);
        this.memberLoaded.emit(true);
      }, error: error => {
        this.loggerService.error(error);
        this.memberLoaded.emit(false);
        this.titleService.setTitle(this.translateService.instant("Member.Errors.MemberNotFoundTitle"));
        this.notificationService.error(this.translateService.instant("Member.Errors.MemberNotFound"));
      }
    });
    this.statsService.getRecap(custId).subscribe({
      next: (data: MemberRecap) => {
        this.memberRecap = data;
      }, error: error => {
        this.loggerService.error(error);
        this.notificationService.error(this.translateService.instant("Member.Errors.RecapNotFound"));
      }
    });
  }
}
