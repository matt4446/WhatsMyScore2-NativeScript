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
import {IGrade, ICompetitionGrades} from "../../../models/models.d.ts";
import {StartListItems} from "./start.list.items.control";
import {CompetitionNav} from "../../nav/competition.nav";
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
                    <nx-list *ngFor="#group of list | groupBy: 'Discipline' | orderBy:'key'">
                        <nx-header item-top>
                            <label [text]="group.key | Title" class="nx-header-title"></label>
                        </nx-header>
                        
                        <nx-item *ngFor="#grade of group.items | orderBy:'ClassName'">
                            <ion-icon item-left icon="ion-clipboard"></ion-icon>
                            <label [text]="grade.ClassName"></label>
                            <ion-icon item-right icon="ion-ios-people"></ion-icon>
                            <label item-right class="note" [text]="grade.Competitors"></label>
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
        }
        
        
    }
    
    public loadDetail(){
        let observable = this.gradeService.List(this.cache.Competition.Id);
        observable.map(e=> e.json()).subscribe(e=> {
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