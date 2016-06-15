import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router-deprecated";
import {Page} from "../../../decorators/page";
import {Logger} from "../../../providers/logger";
//import {SearchList, ISearchEvent} from "../../controls/searchList/searchList";
import {AppRoutingService} from "../../../context/router.context";
import {CompetitionService} from "../../../providers/leagues/competitions";
import {ClubService} from "../../../providers/leagues/club";
import {GradeService} from "../../../providers/leagues/grade";
import {CompetitorService} from "../../../providers/leagues/competitors";
import {RegionCache, CompetitionCache, GradeCache, ClubCache} from "../../../providers/leagues/cache";
import * as Models from "../../../models/models.d.ts";

import * as Rx from "rxjs";
import 'rxjs/add/operator/max';
import 'rxjs/add/operator/distinct';

import {CompetitionNav} from "../../nav/competition.nav";
import {CompetitorResult} from "../../templates/competitor.results";
@Page({
    selector: "grade-competitors-page",
    template: `
        <nx-drawer>
            <competition-nav drawer-aside-left></competition-nav>
            <nx-nav>
                <label class="nx-header-title" [text]="'Competitors' | Title" style="horizontal-align:center"></label>
                <ion-icon nav-right nav="true" icon="ion-android-favorite"></ion-icon>
            </nx-nav>

            <StackLayout class="inset">
                <nx-list>

                    <PullToRefresh [pull-list-view] 
                        (refreshStarted)="refreshStarted($event)"
                        (refreshCompleted)="refreshCompleted()">
                        <ListView [items]="list" [pull-to-animate]>
                            <template let-item="item">
                                <StackLayout>
                                    <competitor-result [competitor]="item"></competitor-result>
                                </StackLayout>
                            </template>
                        </ListView>
                    </PullToRefresh>


                </nx-list>
            </StackLayout>
      
        </nx-drawer>
    `,
    directives: [CompetitionNav, CompetitorResult],
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

    public list: Models.ICompetitor[] = [];

    public onLoaded($event) : void {

    }
    public onItemLoading($event) : void{

    }
    public onItemTap($event): void {

    }

    //action to 
    public gradeSearch($event: any) {
        this.logger.Notify("Search passed to region");
        this.logger.Notify($event);
        //this.logger.Notify("Search Term in Regions Page: " + $event.Value);
    }

    public ngOnInit() {
        this.logger.Notify("grade-page ngOnInit");
        //time to load the data

        this.loadDetail();
    }

    public loadDetail() {
        let obseravable = this.competitorService
            .ListGradeCompetitors(this.context.CompetitionId, this.context.GradeId);

        //this.logger.NotifyResponse(obseravable);

        obseravable.map(e => e.json()).subscribe((e : Models.ICompetitor[]) => {
            this.list = e.sort((a,b) => {
                return a.FinalRank - b.FinalRank;               
            });;
            //let max = Rx.Observable.from(this.list).map(e => e.StartGroup).max();
        });

        return obseravable;
    }

    public refreshStarted(args: any){
        this.logger.Notify("Grade: refresh starting");
        this.loadDetail().subscribe(() => {
            args.completed();
        });
    }
    public refreshCompleted(){
        this.logger.Notify("Grade: refresh completed");
    }

}