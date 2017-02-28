import * as Rx from "rxjs";

import {Component, OnDestroy, OnInit} from '@angular/core';

import {AppRoutingService} from "../../../context/router.context";
import {ClubService} from "../../../providers/leagues/clubService";
import {CompetitionCache} from '../../../providers/leagues/competitionCache';
import {CompetitionNav} from "../../nav/competition.nav";
import {CompetitionService} from "../../../providers/leagues/competitionService";
import {GradeService} from "../../../providers/leagues/gradeService";
import {IGrade} from "../../../models/models";
import {Logger} from "../../../providers/logger";

@Component({
    selector: "grade-list-page",
    //templateUrl: "pages/competition/gradeList/page.html",
    template: `
        <nx-drawer>
            <competition-nav drawer-aside-left></competition-nav>
            
            <nx-nav>
                <label class="nx-header-title" [text]="'Grade List' | Title" style="horizontal-align:center"></label>
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
                                'Region.Competition.GradeList.Competitors', 
                                { regionId: context.RegionId, competitionId: context.CompetitionId, gradeId: grade.Id }
                            ]"
                        >
                            <Label item-left class="material-icons icon-default" text="assignment" textWrap="true"></Label>

                            <label [text]="grade.ClassName"></label>
                            <label class="note" [text]="grade.Competitors + ' competitors' "></label>
                            
                            
                            <ion-icon item-right icon="ion-chevron-right"></ion-icon>
                            
                        </nx-item>
                    </nx-list>
                </StackLayout>
            </nx-content>
            
        </nx-drawer>
    `,
    providers: [CompetitionService, GradeService, ClubService]
})
export class GradeListPage implements OnInit, OnDestroy
{
    constructor(
        private logger: Logger, 
        private competitionService : CompetitionService,
        private gradeService: GradeService,
        private context: AppRoutingService,
        private cache: CompetitionCache)
    {

        this.logger.Notify("grade list page started");
    }
    
    public list : IGrade[] = [];
    
    //subscriptions which need to be unbound on destroy. 
    public subscriptions : Rx.Subscription[] = [];
    
    //action to 
    public gradeSearch($event : any)
    {
        this.logger.Notify($event);
        //this.logger.Notify("Search Term in Regions Page: " + $event.Value);
    } 
    
    public loadCompetition() {
        if(this.cache.Competition == null){
            this.competitionService.Get(this.context.CompetitionId);
        }
    }
    
    public loadDetail() {
        //this.cache.Competition.Id is missing due to parent loads it. 
       
        
        let observable = this.gradeService.List(this.context.CompetitionId).map(e=> e.json());
        observable.subscribe(e=> {
            this.list = e;
        });
        
        return observable;
    }
    
    public refresh(args: any){
        this.loadDetail().subscribe(() => {
            args.completed();
        });
    }
    
     public ngOnInit(){
        this.logger.Notify("grade-list-page ngOnInit");
        //time to load the data
        if(this.cache.Grades && this.cache.Grades.length > 0){
            this.list = this.cache.Grades;
            return;
        }
        
        this.loadDetail();
    }
    
    public ngOnDestroy(){
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }
    
}