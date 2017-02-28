import {AppRoutingService} from "../../../context/router.context";
import {ClubService} from "../../../providers/leagues/club";
import {CompetitionNav} from "../../nav/competition.nav";
import {CompetitionService} from "../../../providers/leagues/competitions";
import {Component} from '@angular/core';
import {GradeService} from "../../../providers/leagues/grade";
import {Logger} from "../../../providers/logger";

@Component({
    selector: "stats-page",
    templateUrl: "pages/competition/stats/stats.page.html",
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