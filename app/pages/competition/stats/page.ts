import {Component} from 'angular2/core';
import {Router} from "angular2/router";
import {Page} from "../../../decorators/page";
import {Logger} from "../../../providers/logger";
import {AppRoutingService} from "../../../context/router.context";
//import {SearchList, ISearchEvent} from "../../controls/searchList/searchList";
import {CompetitionService} from "../../../providers/leagues/competitions";
import {ClubService} from "../../../providers/leagues/club";
import {GradeService} from "../../../providers/leagues/grade";
import {ApplicationCache, CompetitionCache, GradeCache, ClubCache} from "../../../providers/leagues/cache";
@Page({
    selector: "stats-page",
    templateUrl: "pages/competition/stats/page.html",
    providers: [CompetitionService, GradeService, ClubService]
})
export class StatsPage 
{
    constructor(
        private logger: Logger,
        private context: AppRoutingService)
    {

        this.logger.Notify("grade list page started");
    }
    
    public list : Array<any> = [];

    
    //passed to the child component
    public regionsHintText = "Hi from regions";
    
    //action to 
    public regionSearch($event : any)
    {
        this.logger.Notify("Search passed to region");
        this.logger.Notify($event);
        //this.logger.Notify("Search Term in Regions Page: " + $event.Value);
    } 
    
    /* angular2 lifecycle */
    public ngOnInit(){
        
        
        this.logger.Notify("Region-page ngAfterViewInit");
        
        //time to load the data

    }
    

    
}