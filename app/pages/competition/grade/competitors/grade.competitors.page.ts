import "rxjs/add/operator/max";
import "rxjs/add/operator/distinct";

import * as Models from "../../../../models/models";
import * as Rx from "rxjs";

import {Component, OnInit} from "@angular/core";

import {AppRoutingService} from "../../../../context/router.context";
import {ClubService} from "../../../../providers/leagues/clubService";
import {CompetitionCache} from "../../../../providers/leagues/competitionCache";
import {CompetitionNav} from "../../../nav/competition.nav";
import {CompetitionService} from "../../../../providers/leagues/competitionService";
import {CompetitorService} from "../../../../providers/leagues/competitorService";
import {GradeService} from "../../../../providers/leagues/gradeService";
import {Logger} from "../../../../providers/logger";
import { Observable } from "rxjs";

@Component({
    selector: "grade-competitors-page",
    moduleId: module.id,
    template: `
        <nx-drawer>
            <competition-nav drawer-aside-left></competition-nav>
            <nx-nav>
                <label class="title" [text]="'Competitors' | Title" style="horizontal-align:center"></label>
                <ion-icon nav-right nav="true" icon="ion-android-favorite"></ion-icon>
            </nx-nav>
            <nx-content (refreshStarted)="refresh($event)">
                <GridLayout>
                    <StackLayout class="inset">
                        <nx-list *ngFor="let startGroup of list | async">
                            <nx-header item-top>
                                <label *ngIf="groups > 1" [text]="'StartGroup: ' + startGroup.Key | Title" class="title"></label>
                                <label *ngIf="groups <= 1" [text]="'StartGroup'| Title" class="title"></label>
                            </nx-header>
                            <nx-item *ngFor="let person of startGroup.Items | async | orderBy:'StartNumber'">
                                <label item-left [text]="person.StartNumber"></label>

                                <label [text]="person.FullName"></label>
                                <label [text]="person.Club" class="note"></label>
                            </nx-item>
                        </nx-list>
                    </StackLayout>
                    <material-fab text="face" vertical-align="top" horizontal-align="right"></material-fab>
                </GridLayout>

            </nx-content>
        </nx-drawer>
    `,
    providers: [CompetitionService, GradeService, ClubService, CompetitorService]
})
export class GradeCompetitorsPage implements OnInit {
    constructor(
        private logger: Logger,
        private gradeService: GradeService,
        private competitorService: CompetitorService,
        private context: AppRoutingService,
        private cache: CompetitionCache) {
        this.logger.Notify("grade list page started");
    }

    public list: Observable<Models.ICompetitor[]>;
    public groupedList:  Models.IGroup<Models.ICompetitor>;
    public groups: number = 0; // if more than one group change the label

    public gradeSearch($event: any):void {
        this.logger.Notify("Search passed to region");
        this.logger.Notify($event);
    }

    public ngOnInit(): void {
        this.logger.Notify("grade-list-page ngOnInit");

        this.loadDetail();
    }

    public loadDetail(): Observable<Models.ICompetitor[]> {
        let obseravable: Observable<Models.ICompetitor[]> = this.competitorService
            .ListGradeCompetitors(this.context.CompetitionId, this.context.GradeId);

        obseravable
            .flatMap(e=> e)
            .groupBy(e=> e.StartGroup)
            .map(e=> {
                return e.publishReplay().refCount();
            })
            .toArray()

        return obseravable;
    }

    public refresh(args: any): void {
        this.loadDetail().subscribe(() => {
            args.completed();
        });
    }

}