import {Component, OnInit } from '@angular/core';
import {Router} from "@angular/router-deprecated";
import {Page} from "../../../decorators/page";
import {Logger} from "../../../providers/logger";
//import {SearchList, ISearchEvent} from "../../controls/searchList/searchList";
import {AppRoutingService} from "../../../context/router.context";
import {CompetitionService} from "../../../providers/leagues/competitions";
import {ClubService} from "../../../providers/leagues/club";
import {GradeService} from "../../../providers/leagues/grade";
import {RegionCache, CompetitionCache, GradeCache, ClubCache} from "../../../providers/leagues/cache";
import {CompetitionNav} from "../../nav/competition.nav";
import * as Models from "../../../models/models";

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/zip';
// import 'rxjs/add/operator/from';

@Page({
    selector: "club-list-page",
    //templateUrl: "pages/competition/clubList/page.html",
    template: `
        <nx-drawer>
            <competition-nav drawer-aside-left></competition-nav>
            
            <nx-nav>
                <label class="nx-header-title" [text]="'Club' | Title" style="horizontal-align:center"></label>
                <ion-icon nav-right nav="true" icon="ion-android-favorite"></ion-icon>
            </nx-nav>

            <nx-content (refreshStarted)="refresh($event)">
                <StackLayout class="inset">
                    <nx-list *ngFor="let group of list | groupBy: 'Group' | orderBy:'key'">
                        <!-- {"Competitor":{"FullName":"Katherine Allot & Dayle Walker","Club":"Bath","Group":"SS1","Class":null,"Team":null,"Competition":"Synchro"} -->
                        <nx-header item-top>
                            <!-- grade name --> 
                            <label [text]="group.key" class="nx-header-title"></label>
                        </nx-header>
                        <!-- competitors in that grade --> 
                        
                    </nx-list>
                </StackLayout>
            </nx-content>
            
        </nx-drawer>
    `,
    directives: [CompetitionNav],
    providers: [CompetitionService, GradeService, ClubService]
})
export class ClubPage implements OnInit
{
    
    constructor(
        private logger: Logger, 
        private clubService: ClubService,
        private context: AppRoutingService,
        private cache: CompetitionCache)
    {
        this.logger.Notify("club page started");
    }
    
    public list : Models.ICompetitor[] = [];

    
    //passed to the child component
    public regionsHintText = "Hi from regions";
    
    //action to 
    public clubSearch($event : any)
    {
        this.logger.Notify("Search passed to region");
        this.logger.Notify($event);
        //this.logger.Notify("Search Term in Regions Page: " + $event.Value);
    } 
    
    public ngOnInit(){
        this.logger.Notify("club-page ngOnInit");

        this.loadDetail();
    }
    
    public loadDetail() {
        let observable = this.clubService
            .ListCompetitors(this.context.CompetitionId, this.context.ClubId)
            .map(e=> e.json());
        
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
    
    private groupByCompetition(){
        let groups :{key: string, items: any[] }[] = [];

        // this.list.forEach(item => {
        //     item.
        // });
    }
}