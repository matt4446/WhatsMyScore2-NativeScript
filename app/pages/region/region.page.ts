import {Component, OnInit } from '@angular/core';
import {Page} from "../../decorators/page";
import {Logger} from "../../providers/logger";
import {CompetitionService} from "../../providers/leagues/competitions";
import {RouteParams} from "@angular/router-deprecated";
import {ICompetition, IRegion } from "../../models/models"
import {StartNav} from "../nav/start.nav.control";
import {AppRoutingService} from "../../context/router.context";
import {RegionCache, CompetitionCache, GradeCache, ClubCache} from "../../providers/leagues/cache";
import {PullToRefresh} from "nativescript-pulltorefresh";

@Page({
    selector: "Region",
	templateUrl: "pages/region/region.page.html",
    directives: [StartNav],
    providers: [CompetitionService]
})
export class RegionPage implements OnInit
{
    constructor(
        public context : AppRoutingService,
        private params: RouteParams, 
        private logger: Logger, 
        private regionCache: RegionCache,
        private competitionService: CompetitionService)
    {
        this.logger.Notify("region page loaded");
        
        this.logger.Notify("regionId " + this.context.RegionId);
    }
  
    public list : Array<ICompetition> = []; 
    public region : IRegion; 
    
    public refresh(args: any){
        let control : PullToRefresh = args.object;
        
        this.loadDetail().subscribe(() => {
            args.completed();
        });
    }
    
    private loadDetail() {
        let observable = this.competitionService.List(this.context.RegionId);
        
        observable
            .map((response)=> response.json())
            .subscribe((items : ICompetition[]) => { 
                this.list = items; 
            }, (error)=> {
                this.logger.Error(error);
            });
            
        return observable;
    }
    
    ngOnInit()
    {
        this.logger.Notify("ngOnInit: RegionPage");

        this.region = this.regionCache.Region 
            ? this.regionCache.Region  
            : this.regionCache.Regions.filter(e=> e.Id == this.context.RegionId)[0];
        
        this.loadDetail();
    }  
}

