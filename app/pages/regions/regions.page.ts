import {Component, OnInit, ViewChild, ElementRef} from 'angular2/core';
import {Router} from "angular2/router";
import {Page} from "../../decorators/page";
import {Logger} from "../../providers/logger";
import {AppRoutingService} from "../../context/router.context";
//import {SearchList, ISearchEvent} from "../../controls/searchList/searchList";

/* data */
import { RegionService } from "../../providers/leagues/leagues";
import { IRegion } from "../../models/models"
//import { LoadingService} from "../../providers/loadingService/loadingService";
/* directive */
import {Http} from 'angular2/http';
import {Settings} from "../../providers/routes/routes";
import {StartNav} from "../nav/start.nav.control";


import {topmost} from "ui/frame";
import {ActionItem} from "ui/action-bar";
import {NxContent} from "../../controls/content/content.control"
import {PullToRefresh} from "nativescript-pulltorefresh";

@Page({
    selector: "regions-page",
    templateUrl: "pages/regions/regions.page.html",
    providers: [RegionService],
    directives: [StartNav]
})
export class RegionsPage implements OnInit
{
    constructor(
        private http: Http,
        private logger: Logger, 
        private router: Router,
        private appRoutingService: AppRoutingService,
        private regions: RegionService)
    {
        this.logger.Notify("Regions page started");
    }
    
    public list : Array<IRegion> = [];
        
    public back(): void 
    {
        this.logger.Notify("regions - page - back pressed");
        //todo- back pressed
        this.router.navigate(["Start"])
    }
    
    public start() : void
    {
        this.logger.Notify("regions - page - start pressed");
        this.router.navigate(["Start"])
    }
    
    //passed to the child component
    public regionsHintText = "Hi from regions";
    
    //action to 
    public regionSearch($event : any)
    {
        this.logger.Notify("Search passed to region");
        this.logger.Notify($event);
        //this.logger.Notify("Search Term in Regions Page: " + $event.Value);
    } 
    
    private contentViewRef : ElementRef;
        
    public refresh(args: any){
        this.loadDetail().subscribe(() => {
            args.completed();
        });
    }
    
    public loadDetail(){
        this.logger.Notify("load regions");
        var response = this.regions.List();
        
        //transform the data to json -> array of IProvider
        response
            .map(response => response.json())
            .subscribe((items : Array<IRegion>) => {
                this.list = items;
                //this.loadingService.hide();
            },(error) => {
                this.logger.Error("Could not map items");
                this.logger.Error(error);
            });
            
        return response;
    }
    
    
    /* angular2 lifecycle */
    public ngOnInit(){
        this.loadDetail();
    }
       
}