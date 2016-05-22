import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router-deprecated";
import {Page} from "../../../../decorators/page";
import {Logger} from "../../../../providers/logger";
//import {SearchList, ISearchEvent} from "../../controls/searchList/searchList";
import {AppRoutingService} from "../../../../context/router.context";
import {CompetitionService} from "../../../../providers/leagues/competitions";
import {ClubService} from "../../../../providers/leagues/club";
import {GradeService} from "../../../../providers/leagues/grade";
import {CompetitorService} from "../../../../providers/leagues/competitors";
import {RegionCache, CompetitionCache, GradeCache, ClubCache} from "../../../../providers/leagues/cache";
import * as Models from "../../../../models/models.d.ts";
import {CompetitionNav} from "../../../nav/competition.nav";
import * as rx from "rxjs";
import 'rxjs/add/operator/max';

@Page({
    selector: "start-list-grade-page",
    //templateUrl: "pages/competition/gradeList/page.html",
    template: `
        <nx-drawer>
           
            <competition-nav drawer-aside-left></competition-nav>
            <nx-nav>
                <label class="nx-header-title" [text]="'Competitors' | Title" style="horizontal-align:center"></label>
                <ion-icon nav-right nav="true" icon="ion-android-favorite"></ion-icon>
            </nx-nav>
            <nx-content (refreshStarted)="refresh($event)">
                <StackLayout class="inset">
                    <nx-list *ngFor="let startGroup of list | groupBy: 'StartGroup'">
                        <nx-header item-top>
                            <label *ngIf="groups > 1" [text]="'StartGroup: ' + startGroup.key | Title" class="nx-header-title"></label>
                            <label *ngIf="groups == 1" [text]="'StartGroup'| Title" class="nx-header-title"></label>
                        </nx-header>
                        <nx-item *ngFor="let person of startGroup.items | orderBy:'StartNumber'">
                            <label item-left [text]="person.StartNumber"></label>
                                              
                            <label [text]="person.FullName"></label>
                            <label [text]="person.Club" class="note"></label>
                        </nx-item>
                    </nx-list>
                </StackLayout>
            </nx-content>
        </nx-drawer>
    `,
    directives: [CompetitionNav],
    providers: [CompetitionService, GradeService, ClubService, CompetitorService]
})
export class StartListGradePage implements OnInit
{
    constructor(
        private logger: Logger, 
        private gradeService: GradeService,
        private competitorService : CompetitorService,
        private context: AppRoutingService,
        private cache: CompetitionCache)
    {
        this.logger.Notify("grade list page started");
    }
    
    public list : Models.ICompetitor[] = [];
    public groups : number = 0; 

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
        
        this.loadDetail();
    }
    
    public loadDetail(){
        let obseravable = this.competitorService.ListGradeCompetitors(this.context.CompetitionId, this.context.GradeId);
        
        this.logger.NotifyResponse(obseravable);
        
        obseravable.map(e=> e.json()).subscribe(e => {
            this.list = e;
            let max = rx.Observable.from(this.list).map(e=> e.StartGroup).max();
            max.subscribe(m=> {
                this.groups = m;
            });
            //this.list.
            
        });
        
        return obseravable;
    }
    
    public refresh(args: any){
        this.loadDetail().subscribe(() => {
            args.completed();
        });
    }
    
}