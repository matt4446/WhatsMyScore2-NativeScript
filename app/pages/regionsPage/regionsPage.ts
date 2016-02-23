import {NgIf, NgFor} from 'angular2/common';
import {Component} from 'angular2/core';
import {Router} from "angular2/router";
import {Page} from "../../decorators/page";
import {Logger} from "../../providers/logger";
import {SearchList, ISearchEvent} from "../../controls/searchList/searchList";


/* data */
import { ProviderService } from "../../providers/leagues/leagues";
import { IProvider } from "../../models/models"

/* directive */
import { RegionItem } from "./region-item";

import {NxNav} from "../../controls/nav/nav";
import {NxList} from "../../controls/list/list";
import {NxListItem} from "../../controls/list/list-item";
import {NxHeader} from "../../controls/list/header";
import {IonIcon} from "../../controls/icons/ion-icon";
import {Http} from 'angular2/http';
import {Settings} from "../../providers/routes/routes";

@Page({
    selector: "regions-page",
    templateUrl: "pages/regionsPage/regionsPage.html",
    providers: [ProviderService],
    directives: [NgIf, NgFor,SearchList, RegionItem, NxNav, NxList, NxListItem, NxHeader, IonIcon]
})
export class RegionsPage 
{
    constructor(
        private http: Http,
        private logger: Logger, 
        private router: Router,
        private regions: ProviderService)
    {
        this.logger.Notify("Regions page started");
    }
    
    public list : Array<IProvider> = [];
        
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
    
    /* angular2 lifecycle */
    public ngOnInit(){
        this.logger.Notify("Region-page ngAfterViewInit");
        
        /* new test - http */
        
        let base = Settings.WebApiBaseUrl;
        let endpoint  = "/Api/Providers/List/Enabled";
        let route = base + endpoint;
        
        this.logger.Notify("Load :" + route);
        
        this.http.get(route).map(x=> x.json()).subscribe((items: any) => {
            console.log('items: ' + items);          
            this.list = items;
            
            console.log(items.length);
        });
        
        //var observableRequest = this.http.get(route);
        let observableRequest = this.http.get(route);
        
        /* */
        
        
        
        //time to load the data
        var response = this.regions.List();
        
        //transform the data to json -> array of IProvider
        response
            .map(response => response.json())
            .subscribe((items : Array<IProvider>) => {
                this.list = items; //<- items is a object ?
                
                // items.forEach((item) => {
                //     this.logger.Notify("item");
                //     this.logger.Notify(item.Name);
                // });
                
                 this.logger.Notify("items available:" + items.length);
            },(error) => {
                this.logger.Error("Could not map items");
                this.logger.Error(error);
            });
                        
        // response
        //     //.map(r => { return {status: r.status, text: r.text() }; })
        //     .subscribe((result) => {
        //         this.logger.Notify("items loaded - status:" +result.status);
        //         let text = result.text();
        //         this.logger.Notify(text);
        //         let json = result.json();
        //         this.logger.Notify("json parsed: " + json);
        //         this.logger.Notify("Take a peak at json object ...");
        //         this.logger.NotifyObjectProperties(json);
        //         this.logger.Notify("test property count: " +json.count);
        //         this.logger.Notify("test property size:" +json.size);
        //         this.logger.Notify("test property size:" +json.size());
        //         
        //         this.logger.Notify("Try again at the array length:")
        //         this.logger.Notify("length:" + json.length);
        //     });
    }
    
}