import {Component, OnInit} from "@angular/core";

import {AppRoutingService} from "../../../context/router.context";
import {ClubService} from "../../../providers/leagues/clubService";
import {CompetitionCache} from "../../../providers/leagues/competitionCache";
import {CompetitionNav} from "../../nav/competition.nav";
import {CompetitionService} from "../../../providers/leagues/competitionService";
import {GradeService} from "../../../providers/leagues/gradeService";
import {IClub} from "../../../models/models";
import {Logger} from "../../../providers/logger";
import { Observable } from "rxjs/Rx";

@Component({
    selector: "club-list-page",
    moduleId: module.id,
    template: `
        <nx-drawer>
            <competition-nav drawer-aside-left></competition-nav>

            <nx-nav>
                <label class="title" [text]="'Club List' | Title" style="horizontal-align:center"></label>
                <ion-icon nav-right nav="true" icon="ion-android-favorite"></ion-icon>
            </nx-nav>

            <nx-content (refreshStarted)="refresh($event)">
                <StackLayout class="inset">
                    <nx-list *ngFor="let clubGroup of list|async | groupBy: 'Letter' | orderBy:'key'">
                        <nx-header item-top>
                            <label [text]="clubGroup.key" class="nx-header-title"></label>
                        </nx-header>

                        <nx-item *ngFor="let club of clubGroup.items | orderBy:'Name'"
                            [nxRoute]="[
                                'Region.Competition.ClubList.Competitors',
                                { regionId: context.RegionId, competitionId: context.CompetitionId, clubId: club.Id }
                            ]">
                            <nx-icon item-left icon="assignment"></nx-icon>

                            <label [text]="club.Name"></label>
                            <label class="note" [text]="club.Competitors + ' competitors' "></label>

                            <nx-icon item-right icon="chevron_right"></nx-icon>

                        </nx-item>
                    </nx-list>
                </StackLayout>
            </nx-content>

        </nx-drawer>
    `,
    providers: [CompetitionService, GradeService, ClubService]
})
export class ClubListPage implements OnInit {

    constructor(
        private logger: Logger,
        private clubService: ClubService,
        private context: AppRoutingService,
        private cache: CompetitionCache) {
        this.logger.Notify("club list page started");
    }

    public loading : boolean;
    public list : Observable<IClub[]>;

    public clubSearch($event : any): void {
        this.logger.Notify("Search passed to region");
        this.logger.Notify($event);
    }

    public loadDetail(): Observable<IClub[]> {
        this.loading = true;
        let clubListObservable: Observable<IClub[]> = this.clubService.List(this.context.CompetitionId);
        clubListObservable.subscribe(() => {
            this.loading = false;
        });

        this.list = clubListObservable;

        return clubListObservable;
    }

    public refresh(args: any): void {
        this.loadDetail().subscribe(() => {
            args.completed();
        });
    }

    public ngOnInit(): void {
        this.logger.Notify("club-list-page ngOnInit");

        this.loadDetail();
    }

}