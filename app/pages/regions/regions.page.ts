import { Component, OnInit, ViewChild } from '@angular/core';

import { IRegion } from "../../models/models";
import { Logger } from "../../providers/logger";
import { RegionService } from "../../providers/leagues/leagues";
import { StartNav } from "../nav/start.nav.control";

@Component({
    selector: "regions-page",
    templateUrl: "pages/regions/regions.page.html",
    providers: [RegionService],
})
export class RegionsPage implements OnInit
{
    constructor(
        private logger: Logger, 
        private regions: RegionService)
    {
        this.logger.Notify("Regions page started");
    }
    
    public list : Array<IRegion> = [];
    
    //passed to the child component
    public regionsHintText = "Hi from regions";
    
    //action to 
    public regionSearch($event : any)
    {
        this.logger.Notify("Search passed to region");
        this.logger.Notify($event);
        //this.logger.Notify("Search Term in Regions Page: " + $event.Value);
    } 
        
    public refresh(args: any){
        this.logger.Notify("regions page refresh => load data");
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