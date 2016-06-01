import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from "@angular/router-deprecated";
import {Page} from "../../../decorators/page";
import {Logger} from "../../../providers/logger";
//import {SearchList, ISearchEvent} from "../../controls/searchList/searchList";
import {AppRoutingService} from "../../../context/router.context";
import {CompetitionService} from "../../../providers/leagues/competitions";
import {ClubService} from "../../../providers/leagues/club";
import {GradeService} from "../../../providers/leagues/grade";
import {RegionCache, CompetitionCache, GradeCache, ClubCache} from "../../../providers/leagues/cache";
import {IGrade} from "../../../models/models.d.ts";
import {CompetitionNav} from "../../nav/competition.nav";
import * as Rx from "rxjs";

@Page({
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
                        
                        <nx-item *ngFor="let grade of group.items | orderBy:'ClassName'">
                            <ion-icon item-left icon="ion-clipboard"></ion-icon>
                            
                            <label [text]="grade.ClassName"></label>
                            <label text ="hi"></label>
                            <StackLayout item-right class="float-center" >
                                <ion-icon icon="ion-ios-people"></ion-icon>
                                <label class="note text-center" [text]="grade.Competitors"></label>
                            </StackLayout>
                            
                        </nx-item>
                    </nx-list>
                </StackLayout>
            </nx-content>
            
        </nx-drawer>
    `,
    directives: [CompetitionNav],
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