import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
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
    directives: [CompetitionNav],
    providers: [CompetitionService, GradeService, ClubService]
})
export class GradeListPage implements OnInit
{
    constructor(
        private logger: Logger, 
        private gradeService: GradeService,
        private context: AppRoutingService,
        private cache: CompetitionCache)
    {

        this.logger.Notify("grade list page started");
    }
    
    public list : IGrade[] = [];

    //passed to the child component
    public regionsHintText = "Hi from regions";
    
    //action to 
    public gradeSearch($event : any)
    {
        this.logger.Notify("Search passed to region");
        this.logger.Notify($event);
        //this.logger.Notify("Search Term in Regions Page: " + $event.Value);
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
    
    public loadDetail() {
        let observable = this.gradeService.List(this.cache.Competition.Id).map(e=> e.json());
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
}