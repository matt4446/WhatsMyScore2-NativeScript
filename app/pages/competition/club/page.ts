import {Component, OnInit } from 'angular2/core';
import {Router} from "angular2/router";
import {Page} from "../../../decorators/page";
import {Logger} from "../../../providers/logger";
//import {SearchList, ISearchEvent} from "../../controls/searchList/searchList";
import {AppRoutingService} from "../../../context/router.context";
import {CompetitionService} from "../../../providers/leagues/competitions";
import {ClubService} from "../../../providers/leagues/club";
import {GradeService} from "../../../providers/leagues/grade";
import {RegionCache, CompetitionCache, GradeCache, ClubCache} from "../../../providers/leagues/cache";
import {IClub} from "../../../models/models.d.ts";
@Page({
    selector: "club-list-page",
    //templateUrl: "pages/competition/clubList/page.html",
    template: `
        <nx-drawer>
            <competition-nav drawer-aside-left></competition-nav>
            
            <nx-nav>
                <label class="nx-header-title" [text]="'Club List' | Title" style="horizontal-align:center"></label>
                <ion-icon nav-right nav="true" icon="ion-android-favorite"></ion-icon>
            </nx-nav>

            <ScrollView>
                <StackLayout class="inset">
                    <nx-list *ngFor="#clubGroup of list | groupBy: 'Grade.ClassName' | orderBy:'key'">
                        <nx-header item-top>
                            <!-- grade name --> 
                            <label [text]="clubGroup.key" class="nx-header-title"></label>
                        </nx-header>
                        <!-- competitors in that grade --> 
                        <nx-item *ngFor="#competitor of gradeGroup.items | orderBy:'Rank'">
                            <!-- going to need some expanding panel like v1 -->
                            <!-- name, club, rank + score -->
                            <ion-icon item-left icon="ion-clipboard"></ion-icon>
                            <label [text]="club.Name"></label>
                            <ion-icon item-right icon="ion-ios-people"></ion-icon>
                            <label item-right class="note" [text]="club.Competitors"></label>
                        </nx-item>
                    </nx-list>
                </StackLayout>
            </ScrollView>
            
        </nx-drawer>
    `,
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
        this.logger.Notify("club list page started");
    }
    
    public list : IClub[] = [];

    
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
        this.logger.Notify("club-list-page ngOnInit");
        
        //time to load the data
        if(this.cache.Clubs && this.cache.Clubs.length > 0){
            this.list = this.cache.Clubs;
            return;
        }

        this.clubService.List(this.cache.Competition.Id).map(e=> e.json()).subscribe(e=> {
            this.list = e;
        });

    }
    
    
}