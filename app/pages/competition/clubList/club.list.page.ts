import {Component, OnInit} from "@angular/core";

import {AppRoutingService} from "../../../context/router.context";
import {ClubService} from "../../../providers/leagues/clubService";
import {CompetitionCache} from "../../../providers/leagues/competitionCache";
import {CompetitionNav} from "../../nav/competition.nav";
import {CompetitionService} from "../../../providers/leagues/competitionService";
import {GradeService} from "../../../providers/leagues/gradeService";
import {IClub} from "../../../models/models";
import {Logger} from "../../../providers/logger";

@Component({
    selector: "club-list-page",
    moduleId: module.id,
    template: `
        <nx-drawer>
            <competition-nav drawer-aside-left></competition-nav>

            <nx-nav>
                <label class="nx-header-title" [text]="'Club List' | Title" style="horizontal-align:center"></label>
                <ion-icon nav-right nav="true" icon="ion-android-favorite"></ion-icon>
            </nx-nav>

            <nx-content (refreshStarted)="refresh($event)">
                <StackLayout class="inset">
                    <nx-list *ngFor="let clubGroup of list | groupBy: 'Letter' | orderBy:'key'">
                        <nx-header item-top>
                            <label [text]="clubGroup.key" class="nx-header-title"></label>
                        </nx-header>

                        <nx-item *ngFor="let club of clubGroup.items | orderBy:'Name'"
                            [nxRoute]="[
                                'Region.Competition.ClubList.Competitors', 
                                { regionId: context.RegionId, competitionId: context.CompetitionId, clubId: club.Id }
                            ]">
                            <ion-icon item-left icon="ion-clipboard"></ion-icon>

                            <label [text]="club.Name"></label>
                            <label class="note" [text]="club.Competitors + ' competitors' "></label>

                            <ion-icon item-right icon="ion-chevron-right"></ion-icon>
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

    public list : IClub[] = [];

    public regionsHintText = "Hi from regions";

    public clubSearch($event : any) {
        this.logger.Notify("Search passed to region");
        this.logger.Notify($event);
    }

    public loadDetail() {
        let observable = this.clubService.List(this.context.CompetitionId).map(e=> e.json());
        observable.subscribe(e=> {
            this.list = e;
        });

        return observable;
    }

    public refresh(args: any) {
        this.loadDetail().subscribe(() => {
            args.completed();
        });
    }

    public ngOnInit() {
        this.logger.Notify("club-list-page ngOnInit");

        if(this.cache.Clubs && this.cache.Clubs.length > 0){
            this.list = this.cache.Clubs;
            return;
        }

        this.loadDetail();
    }

}