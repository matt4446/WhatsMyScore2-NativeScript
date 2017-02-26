import {Component, OnInit, OnDestroy } from '@angular/core';
import {Logger} from "../../providers/logger";
import {CompetitionService} from "../../providers/leagues/competitions";
import {ICompetition, IRegion } from "../../models/models"
import {StartNav} from "../nav/start.nav.control";
import {AppRoutingService} from "../../context/router.context";
import {RegionCache, CompetitionCache, GradeCache, ClubCache} from "../../providers/leagues/cache";
import {PullToRefresh} from "nativescript-pulltorefresh";
import { RegionService } from "../../providers/leagues/leagues";
import * as Rx from "rxjs";
@Component({
    selector: "Region",
	templateUrl: "pages/region/region.page.html",
    providers: [CompetitionService, RegionService]
})
export class RegionPage implements OnInit, OnDestroy
{
    constructor(
        public context : AppRoutingService,
        //private params: RouteParams, 
        private logger: Logger, 
        private regionCache: RegionCache,
        private regionService: RegionService,
        private competitionService: CompetitionService)
    {
        this.logger.Notify("region page loaded");
        
        this.logger.Notify("regionId " + this.context.RegionId);
    }
  
    public list : Array<ICompetition> = []; 
    public region : IRegion = {
        Name : "",
        Id: 0,
        Logo: ""
    }; 
    
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
    
    private SetRegion(){
        this.region = this.regionCache.Region 
            ? this.regionCache.Region  
            : this.regionCache.Regions.filter(e=> e.Id == this.context.RegionId)[0];
        
    }
    
    private regionsSubscription : Rx.Subscription; 
    
    ngOnInit()
    {
        this.logger.Notify("ngOnInit: RegionPage");
        this.regionsSubscription = this.regionCache.RegionsChange.subscribe(all => {
            this.region = all.filter(e=> e.Id == this.context.RegionId)[0];
        });
        
        if(this.regionCache.Regions == null){
            this.regionService.List();
        }else{
            this.SetRegion();
        }
        
        this.loadDetail();
    }  
    
    ngOnDestroy(){
        this.regionsSubscription.unsubscribe();
    }
    
}

