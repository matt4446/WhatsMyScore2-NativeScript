import * as Models from "../../../models/models";

import {Component, OnInit} from "@angular/core";

import {AppRoutingService} from "../../../context/router.context";
import {ClubService} from "../../../providers/leagues/clubService";
import {CompetitionCache} from "../../../providers/leagues/competitionCache";
import {CompetitionNav} from "../../nav/competition.nav";
import {CompetitionService} from "../../../providers/leagues/competitionService";
import {CompetitorResult} from "../../templates/competitor.results";
import {GradeService} from "../../../providers/leagues/gradeService";
import {Logger} from "../../../providers/logger";
import { Observable } from "rxjs/Rx";

@Component({
    selector: "club-list-page",
    moduleId: module.id,
    template: `
        <nx-drawer>
            <competition-nav drawer-aside-left></competition-nav>

            <nx-nav>
                <label class="title" [text]="'Club' | Title" style="horizontal-align:center"></label>
                <ion-icon nav-right nav="true" icon="ion-android-favorite"></ion-icon>
            </nx-nav>

            <nx-content (refreshStarted)="refresh($event)">
                <StackLayout class="inset">
                    <nx-list *ngFor="let group of List | async">
                        <nx-header item-top>
                            <!-- grade name -->
                            <label [text]="group.key" class="title"></label>
                        </nx-header>
                        <!-- competitors in that grade -->

                        <competitor-result *ngFor="let item of group.items | async" [competitor]="item"></competitor-result>
                    </nx-list>
                </StackLayout>
            </nx-content>

        </nx-drawer>
    `
})
export class ClubPage implements OnInit {
    constructor(
        private logger: Logger,
        private clubService: ClubService,
        private context: AppRoutingService,
        private cache: CompetitionCache) {
        this.logger.Notify("club page started");
    }

    public list: Observable<Models.IGroup<Models.ICompetitorContext>[]>;

    public clubSearch($event : any): void {
        this.logger.Notify("Search passed to region");
        this.logger.Notify($event);
    }

    public ngOnInit(): void {
        this.logger.Notify("club-page ngOnInit");

        this.loadDetail();
    }

    public loadDetail(): Observable<Models.ICompetitor[]> {
        let observable: Observable<Models.ICompetitor[]> = this.clubService
            .ListCompetitors(this.context.CompetitionId, this.context.ClubId);

        this.list = observable
            .flatMap(e=> e)
            .groupBy(e=> e.Group)
            .map(e => {
                let items: Observable<Models.ICompetitorContext> = e.map(e=> {
                        let context : Models.ICompetitorContext = {
                            Competitor : e,
                            Expanded : false
                        };
                        return context;
                    })
                    .publishReplay()
                    .refCount();

                let group: Models.IGroup<Models.ICompetitorContext> = {
                    Key : e.key,
                    Items: items.toArray()
                };

                return group;
            })
            .toArray();

        return observable;
    }

    public refresh(args: any):void {
        this.loadDetail().subscribe(() => {
            args.completed();
        });
    }
}