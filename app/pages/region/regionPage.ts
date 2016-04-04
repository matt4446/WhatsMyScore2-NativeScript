import {Component} from 'angular2/core';
import {Page} from "../../decorators/page";
import {Logger} from "../../providers/logger";
import {CompetitionService} from "../../providers/leagues/competitions";
import {RouteParams} from "angular2/router";
import { ICompetition } from "../../models/models"
import {StartNav} from "../nav/start.nav";
@Page({
    selector: "Region",
	templateUrl: "pages/regionPage/regionPage.html",
    directives: [StartNav],
    providers: [CompetitionService]
})
export class RegionPage 
{
    constructor(private params: RouteParams,private logger: Logger, private competitionService: CompetitionService)
    {
        this.logger.Notify("region page loaded");
    }
  
    public list : Array<ICompetition> = []; 
    
    private ngOnInit()
    {
        this.logger.Notify("ngOnInit: RegionPage");
        let regionId = this.params.get("regionId");
        let observable = this.competitionService.List(regionId);
        observable
            .map((response)=> response.json())
            .subscribe((items : ICompetition[]) => { 
                items.forEach((item)=> {
                    this.logger.Notify(<any>item);
                    this.logger.NotifyObjectProperties(item);
                });
                this.list = items; 
            }, (error)=> {
                this.logger.Error(error);
            });
    }  
}

