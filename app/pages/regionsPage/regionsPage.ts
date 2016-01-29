import {NgIf, NgFor} from 'angular2/common';
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

@Page({
    selector: "regions",
    templateUrl: "pages/regionsPage/regionsPage.html",
    providers: [ProviderService],
    directives: [NgIf, NgFor,SearchList, RegionItem, NxList, NxListItem, NxHeader, IonIcon] //<-- Search list directive added here
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
        this.logger.Notify("Region-page ngAfterViewInit");
        
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
                // 
                // this.logger.Notify("items available:" + items.length);
            },(error) => {
                this.logger.Error("Could not map items");
                this.logger.Error(error);
            });
                        
        response
            //.map(r => { return {status: r.status, text: r.text() }; })
            .subscribe((result) => {
                this.logger.Notify("items loaded - status:" +result.status);
                let text = result.text();
                this.logger.Notify(text);
                let json = result.json();
                this.logger.Notify("json parsed: " + json);
                this.logger.Notify("Take a peak at json object ...");
                this.logger.NotifyObjectProperties(json);
                this.logger.Notify("test property count: " +json.count);
                this.logger.Notify("test property size:" +json.size);
                this.logger.Notify("test property size:" +json.size());
            });
    }
    
}