import {Component} from 'angular2/core';
import {Page} from "../../decorators/page";
import {Logger} from "../../providers/logger";
import {Router} from "angular2/router";
import {SearchList, ISearchEvent} from "../../controls/searchList/searchList";

/* data */
import { ProviderService } from "../../providers/leagues/leagues";
import { IProvider } from "../../models/models"

/* directive */
import { RegionItem } from "./region-item";

@Page({
    selector: "regions",
    templateUrl: "pages/regionsPage/regionsPage.html",
    providers: [ProviderService],
    directives: [SearchList, RegionItem] //<-- Search list directive added here
})
export class RegionsPage 
{
    constructor(
        private logger: Logger, 
        private router: Router,
        private regions: ProviderService)
    {
        this.logger.Notify("Regions page started");
    }
    
    public list : Array<IProvider> = [];
    
    public pageLoaded(args:any): void {
        this.logger.Notify("regions page - loaded");
        console.log("regions page - loaded - i happen alot?");
        
        //does not work:
        //var page = <pages.Page>args.object;
        // var page = args.object;
        // page.animate({
        //     translate: { x: 30, y:0 }
        // });
    }
    
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
    //search will be different to the ionic project:
    //https://github.com/NativeScript/nativescript-angular/issues/27
    
    /* angular2 lifecycle */
    public ngAfterViewInit(){
        this.logger.Notify("view init");
        
        //time to load the data
        var response = this.regions.List();
        
        
        response.map(response => response.json())
            .subscribe((items : IProvider[]) => {
                this.list = items;
                
                this.logger.Notify("items available:" + items.length);
            });
            
        response.map(r => r.text())
            .subscribe((result) => {
                this.logger.Notify("items loaded");
                this.logger.Notify(result);
            });
    }
    
}