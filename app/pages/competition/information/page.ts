import {Component} from 'angular2/core';
import {Router} from "angular2/router";
import {Page} from "../../../decorators/page";
import {Logger} from "../../../providers/logger";
//import {SearchList, ISearchEvent} from "../../controls/searchList/searchList";


@Page({
    selector: "grade-list-page",
    templateUrl: "./grade.list.page.html"
})
export class InformationPage 
{
    constructor(private logger: Logger)
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