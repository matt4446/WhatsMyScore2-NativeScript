import * as Models from "../../../models/models";

import {Component, OnInit} from "@angular/core";
import {Observable, Subject, Subscription} from "rxjs/Rx";

import {AppRoutingService} from "../../../context/router.context";
import {ClubService} from "../../../providers/leagues/clubService";
import {CompetitionCache} from "../../../providers/leagues/competitionCache";
import {CompetitionNav} from "../../nav/competition.nav";
import {CompetitionService} from "../../../providers/leagues/competitionService";
import {GradeService} from "../../../providers/leagues/gradeService";
import {GroupedObservable} from "rxjs/operator/groupBy";
import {IGrade} from "../../../models/models";
import {Logger} from "../../../providers/logger";
import {StartListItems} from "./start.list.items.control";

@Component({
    selector: "start-list-page",
    template: `
        <nx-drawer>
            <competition-nav drawer-aside-left></competition-nav>

            <nx-nav>
                <label class="title" [text]="'Start List' | Title" style="horizontal-align:center"></label>
                <ion-icon nav-right nav="true" icon="ion-android-favorite"></ion-icon>
            </nx-nav>

            <nx-content (refreshStarted)="refresh($event)">
                <StackLayout class="inset">
                    <nx-list *ngFor="let group of list|async | groupBy: 'Discipline' | orderBy:'key'">
                        <nx-header item-top>
                            <label [text]="group.key | Title" class="nx-header-title"></label>
                        </nx-header>

                        <nx-item *ngFor="let grade of group.items | orderBy:'ClassName'"
                            [nsRouterLink]="[grade.Id]"
                            pageTransition="slide">

                            <label [text]="grade.ClassName"></label>
                            <label class="note" [text]="grade.Competitors + ' competitors' "></label>

                            <Label item-left class="material-icons text-center icon-default" text="assignment" textWrap="true"></Label>
                            <ion-icon item-right icon="ion-chevron-right"></ion-icon>

                        </nx-item>
                    </nx-list>
                </StackLayout>
            </nx-content>

        </nx-drawer>
    `,
    providers: [CompetitionService, GradeService, ClubService],
})
export class StartListPage implements OnInit {
    constructor(
        private logger: Logger,
        private context: AppRoutingService,
        private cache: CompetitionCache,
        private gradeService : GradeService) {
    }

    public list : Observable<IGrade[]>;

    public gradeSearch($event : any): void {
        this.logger.Notify("Search passed to start list");
        this.logger.Notify($event);
    }

    public ngOnInit():void {
        this.logger.Notify("start-list-page ngOnInit");

        if(this.cache.HasGrades()) {
            this.list = Observable.of(this.cache.Grades);
            return;
        }

        this.loadDetail();
    }

    public loadDetail(): Observable<IGrade[]> {
        let observable: Observable<IGrade[]> = this.gradeService.List(this.context.CompetitionId);
        this.list = observable;

        return observable;
    }

    public refresh(args: any): void {
        this.loadDetail().subscribe(() => {
            args.completed();
        });
    }
}