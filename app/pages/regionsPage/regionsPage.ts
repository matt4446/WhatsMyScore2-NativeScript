import {Component} from 'angular2/core';
import {Page} from "../../decorators/page";
import {Logger} from "../../providers/logger";
import {Router} from "angular2/router";

@Page({
    selector: "regions",
    templateUrl: "pages/regionsPage/regionsPage.html"
})
export class RegionsPage 
{
    constructor(private logger: Logger, private router: Router)
    {
        this.logger.Notify("Regions page started");
    }
    
    public pageLoaded(): void {
        this.logger.Notify("regions page - loaded");
        console.log("regions page - loaded - i happen alot?");
    }
    
    public back(): void 
    {
        this.logger.Notify("regions - page - back pressed");
    }
    
    public start() : void
    {
        this.logger.Notify("regions - page - start pressed");
    }
    //search will be different to the ionic project:
    //https://github.com/NativeScript/nativescript-angular/issues/27
}