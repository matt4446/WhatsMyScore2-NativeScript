import * as Rx from "rxjs";

import {Component, OnDestroy, OnInit} from "@angular/core";

import {AppRoutingService} from "../../../context/router.context";
import {ClubService} from "../../../providers/leagues/clubService";
import {CompetitionCache} from "../../../providers/leagues/competitionCache";
import {CompetitionNav} from "../../nav/competition.nav";
import {CompetitionService} from "../../../providers/leagues/competitionService";
import {GradeService} from "../../../providers/leagues/gradeService";
import {IGrade} from "../../../models/models";
import {Logger} from "../../../providers/logger";
import { Observable } from "rxjs";

@Component({
    selector: "grade-list-page",
    template: `
        <nx-drawer>
            <competition-nav drawer-aside-left></competition-nav>

            <nx-nav>
                <label class="title" [text]="'Grade List' | Title" style="horizontal-align:center"></label>
                <ion-icon nav-right nav="true" icon="ion-android-favorite"></ion-icon>
            </nx-nav>

            <nx-content (refreshStarted)="refresh($event)">
                <StackLayout class="inset" *ngIf="loading">
                    <Label text="No grades to display" textWrap="true"></Label>
                </StackLayout>
                <StackLayout class="inset" *ngIf="!loading">
                    <nx-list *ngFor="let group of list|async | groupBy: 'Discipline' | orderBy:'key'">
                        <nx-header item-top>
                            <label [text]="group.key | Title" class="title"></label>
                        </nx-header>

                        <nx-item *ngFor="let grade of group.items | orderBy:'ClassName'"
                            [nsRouterLink]="[grade.Id]"
                            pageTransition="slide">
                            <nx-icon item-left icon="assignment"></nx-icon>

                            <label [text]="grade.ClassName"></label>
                            <label class="note" [text]="grade.Competitors + ' competitors' "></label>

                            <nx-icon item-right icon="chevron_right"></nx-icon>
                        </nx-item>
                    </nx-list>
                </StackLayout>
            </nx-content>

        </nx-drawer>
    `,
    providers: [CompetitionService, GradeService, ClubService]
})
export class GradeListPage implements OnInit {
    constructor(
        private logger: Logger,
        private competitionService : CompetitionService,
        private gradeService: GradeService,
        private context: AppRoutingService,
        private cache: CompetitionCache) {

        this.logger.Notify("grade list page started");
    }

    public loading : boolean = true;
    public list : Observable<IGrade[]>;

    public gradeSearch($event : any): void {
        this.logger.Notify($event);
    }

    public loadDetail(): Observable<IGrade[]> {
        this.logger.Notify("load grade list");
        this.list = this.gradeService.List(this.context.CompetitionId);
        this.list.subscribe(() => {
            this.logger.Notify("grade list loaded");
            this.loading = false;
        });
        return this.list;
    }

    public refresh(args: any): void {
        this.logger.Notify("Refresh grade-list page");
        this.loadDetail().subscribe(() => {
            args.completed();
        });
    }

     public ngOnInit(): void {
        this.logger.Notify("grade-list-page ngOnInit");

        this.loadDetail();
    }
}