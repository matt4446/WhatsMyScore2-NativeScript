import {AppRoutingService} from "../../../context/router.context";
import {ClubService} from "../../../providers/leagues/clubService";
import {CompetitionCache} from "../../../providers/leagues/competitionCache";
import {CompetitionNav} from "../../nav/competition.nav";
import {CompetitionService} from "../../../providers/leagues/competitionService";
import {Component} from "@angular/core";
import {GradeService} from "../../../providers/leagues/gradeService";
import {ICompetition} from "../../../models/models";
import {Logger} from "../../../providers/logger";
import { Observable } from "rxjs/Rx";

@Component({
    selector: "grade-list-page",
    template: `
        <nx-drawer>
            <competition-nav drawer-aside-left></competition-nav>

            <nx-nav>
                <label class="title" text="Information" style="horizontal-align:center"></label>
                <ion-icon nav-right nav="true" icon="ion-android-favorite"></ion-icon>
            </nx-nav>

            <nx-content (refreshStarted)="refresh($event)">
                <StackLayout class="inset">
                    <nx-list>
                        <nx-header item-top>
                            <label [text]="'information' | Title" class="title"></label>
                        </nx-header>
                        <nx-item>
                            <label text="Information"></label>
                        </nx-item>
                    </nx-list>
                </StackLayout>
            </nx-content>

        </nx-drawer>
    `,
    providers: [CompetitionService, GradeService, ClubService]
})
export class InformationPage {
    constructor(
        private logger: Logger,
        private context: AppRoutingService,
        private competitionCache : CompetitionCache,
        private competitionService: CompetitionService) {
        this.logger.Notify("grade list page started");
    }

    public competition : any;

    // passed to the child component
    public regionsHintText = "Hi from regions";

    public ngOnInit(): void {
        if(this.competitionCache.Competition) {
            this.competition = this.competitionCache.Competition;
            return;
        }
        this.loadDetail();
    }

    public loadDetail(): Observable<ICompetition> {
        let competitionId: number = this.context.CompetitionId;
        let observable: Observable<ICompetition> = this.competitionService.Get(competitionId);

        observable
            .subscribe((competition : ICompetition) => {
                this.competitionCache.Competition = competition;
            }, (error)=> {
                this.logger.Error(error);
            });

        return observable;
    }

    public refresh(args: any): void {
        this.loadDetail().subscribe(() => {
            args.completed();
        });
    }
}