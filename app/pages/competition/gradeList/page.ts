import {Component, OnInit} from 'angular2/core';
import {Router} from "angular2/router";
import {Page} from "../../../decorators/page";
import {Logger} from "../../../providers/logger";
//import {SearchList, ISearchEvent} from "../../controls/searchList/searchList";
import {AppRoutingService} from "../../../context/router.context";
import {CompetitionService} from "../../../providers/leagues/competitions";
import {ClubService} from "../../../providers/leagues/club";
import {GradeService} from "../../../providers/leagues/grade";
import {ApplicationCache, CompetitionCache, GradeCache, ClubCache} from "../../../providers/leagues/cache";
@Page({
    selector: "grade-list-page",
    templateUrl: "pages/competition/gradeList/page.html",
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
        this.logger.Notify("grade-list-page ngOnInit");
        //time to load the data
        if(this.cache.Grades && this.cache.Grades.length > 0){
            this.list = this.cache.Grades;
            return;
        }
        
        this.gradeService.List(this.cache.Competition.Id).map(e=> e.json()).subscribe(e=> {
            this.list = e;
        });

    }
    
}