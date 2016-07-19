import {Component, OnInit} from '@angular/core';
//import {Router} from "@angular/router-deprecated";
import {Page} from "../../../decorators/page";
import {Logger} from "../../../providers/logger";
import {AppRoutingService} from "../../../context/router.context";
//import {SearchList, ISearchEvent} from "../../controls/searchList/searchList";
import {CompetitionService} from "../../../providers/leagues/competitions";
import {ClubService} from "../../../providers/leagues/club";
import {GradeService} from "../../../providers/leagues/grade";
import {RegionCache, CompetitionCache, GradeCache, ClubCache} from "../../../providers/leagues/cache";
import {Observable, Subscription, Subject} from 'rxjs/Rx';
import {GroupedObservable} from "rxjs/operator/groupBy";

import {StartListItems} from "./start.list.items.control";
import {CompetitionNav} from "../../nav/competition.nav";
import * as Models from "../../../models/models";

@Page({
    selector: "start-list-page",
    //templateUrl: "pages/competition/startList/page.html",
    template: `
        <nx-drawer>
            <competition-nav drawer-aside-left></competition-nav>
            
            <nx-nav>
                <label class="nx-header-title" [text]="'Start List' | Title" style="horizontal-align:center"></label>
                <ion-icon nav-right nav="true" icon="ion-android-favorite"></ion-icon>
            </nx-nav>

            <nx-content (refreshStarted)="refresh($event)">
                <StackLayout class="inset">
                    <nx-list *ngFor="let group of list | groupBy: 'Discipline' | orderBy:'key'">
                        <nx-header item-top>
                            <label [text]="group.key | Title" class="nx-header-title"></label>
                        </nx-header>
                        
                        <nx-item *ngFor="let grade of group.items | orderBy:'ClassName'" 
                            [nxRoute]="[
                                'Region.Competition.StartList.Competitors', 
                                { regionId: context.RegionId, competitionId: context.CompetitionId, gradeId: grade.Id }
                            ]">
                            
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
    directives: [StartListItems, CompetitionNav] 
})
export class StartListPage implements OnInit
{
    constructor(
        private logger: Logger,
        private context: AppRoutingService,
        private cache: CompetitionCache,
        private gradeService : GradeService)
    {

        this.logger.Notify("start-list-page started");
    }
    
    public list : any;

    //action to 
    public gradeSearch($event : any)
    {
        this.logger.Notify("Search passed to start list");
        this.logger.Notify($event);
        //this.logger.Notify("Search Term in Regions Page: " + $event.Value);
    } 
    
    /* angular2 lifecycle */
    public ngOnInit(){        
        this.logger.Notify("start-list-page ngOnInit");
        
        if(this.cache.Grades && this.cache.Grades.length > 0){
            this.list = this.cache.Grades;
            return;
        }else{
            this.loadDetail();
        }
        
        
    }
    
    public loadDetail(){
        let observable = this.gradeService.List(this.context.CompetitionId);
        observable.map(e=> e.json()).subscribe((e : Models.ICompetitor[]) => {
            this.list = e;
        });
        
        return observable;
    }
    
    public refresh(args: any){
        this.loadDetail().subscribe(() => {
            args.completed();
        });
    }
}