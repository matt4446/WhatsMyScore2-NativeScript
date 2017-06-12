import "rxjs/add/operator/max";
import "rxjs/add/operator/distinct";

import * as Models from "../../../../models/models";
import * as Rx from "rxjs";
import * as _ from "lodash";

import {Component, Input, OnInit} from "@angular/core";

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
    selector: "start-group-list",
    template: `
        <!--
        <ListView [items]="startGroup">
            <template let-person="item">
                <nx-item>
                    <label item-left [text]="person.StartNumber"></label>
                    <nx-icon item-left icon="assignment" [text]="person.StartNumber"></nx-icon>
                    <label [text]="person.FullName"></label>
                    <label [text]="person.Club" class="note"></label>
                </nx-item>
            </template>
        </ListView>
        -->
        <nx-item *ngFor="let person of startGroup">
            <!--<label item-left [text]="person.StartNumber"></label>-->
            <nx-icon item-left [text]="person.StartNumber"></nx-icon>
            <label [text]="person.FullName"></label>
            <label [text]="person.Club" class="note"></label>
        </nx-item>

    `
})
export class StartGroup {
    constructor(private logger: Logger) {
    }
    @Input("data")
    public set data(value: Models.ICompetitor[]){
        this.startGroup = value;
        this.logger.Notify("items in group: " + value.length);
    }
    public startGroup: Models.ICompetitor[];
}

@Component({
    selector: "start-list-grade-page",
    template: `
        <nx-drawer>
            <competition-nav drawer-aside-left></competition-nav>
            <nx-nav>
                <label class="title" [text]="titel | async" style="horizontal-align:center"></label>
                <ion-icon nav-right nav="true" icon="ion-android-favorite"></ion-icon>
            </nx-nav>

            <nx-content (refreshStarted)="refresh($event)">
                <GridLayout>
                    <StackLayout class="inset">
                        <nx-list *ngFor="let startGroup of list|async">
                            <nx-header item-top>
                                <label *ngIf="(groupCount | async) > 1"
                                    [text]="'Flight: ' + startGroup.Key | Title"
                                    class="title">
                                </label>
                                <label *ngIf="(groupCount | async) <= 1" [text]="'1 Flight'" class="title"></label>
                            </nx-header>
                            <nx-item *ngFor="let person of startGroup.Items|async|orderBy:'StartNumber'">
                                <nx-icon item-left [text]="person.StartNumber"></nx-icon>
                                <label [text]="person.FullName"></label>
                                <label [text]="person.Club" class="note"></label>
                                <!-- todo : change to score. -->
                                <ion-icon item-right icon="ion-flame"></ion-icon>
                                <Label class='note' item-right [text]="person.Total | number:'3.3-3'" textWrap="true"></Label>
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
export class StartListGradePage implements OnInit {
    constructor(
        private logger: Logger,
        private gradeService: GradeService,
        private competitorService : CompetitorService,
        private context: AppRoutingService,
        private cache: CompetitionCache) {

        this.logger.Notify("grade list page started");
    }
    public list : Observable<Models.IGroup<Models.ICompetitor>[]>;

    public groupCount : Observable<number>;
    public title : Observable<string>;

    public gradeSearch($event : any): void {
        this.logger.Notify("Search passed to region");
        this.logger.Notify($event);
    }

    public ngOnInit(): void {
        this.logger.Notify("grade-list-page ngOnInit");

        this.loadDetail();
    }

    public refresh(args: any): void {
        this.loadDetail().subscribe(() => {
            args.completed();
        }, () => {
            args.completed();
        });
    }

    private sortByStartGroup(a: Models.ICompetitor, b: Models.ICompetitor): number {

        if(a.StartGroup === b.StartGroup) {
            return a.StartNumber < b.StartNumber ? -1 : 1 ;
        }

        return a.StartGroup < b.StartGroup ? -1 : 1;
    }

    public loadDetail(): Observable<Models.ICompetitor[]> {

        let obseravable: Observable<Models.ICompetitor[]> = this.competitorService
            .ListGradeCompetitors(this.context.CompetitionId, this.context.GradeId);

        obseravable.subscribe(e=> {
            this.logger.Notify(`${e.length}`);
        });
        let list: Observable<Models.IGroup<Models.ICompetitor>[]> = obseravable
            // .map((e) => {
            //     return e.sort((a,b) => this.sortByStartGroup(a,b));
            // })
            .flatMap(e=> e)
            .groupBy(e=> e.StartGroup)
            .map(e=> {
                let items: Observable<Models.ICompetitor[]> = e.publishReplay().refCount().toArray();
                var model: Models.IGroup<Models.ICompetitor> = {
                  Key : e.key,
                  Items : items
                };
                model.Items.subscribe((group) => {
                    this.logger.Notify(`${model.Key} - ${group.length}`);
                });
                return model;
            }).toArray();

        this.groupCount = list.map(e=> e.length);
        this.title = this.groupCount.map(e=> `Groups: ${e}`);
        this.title.subscribe((e) => this.logger.Notify(e));

        this.list = list;

        return obseravable;
    }

    public refreshStarted(args: any):void {
        this.loadDetail().subscribe(() => {
            args.completed();
        });
    }
}