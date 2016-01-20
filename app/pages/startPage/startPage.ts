import {Observable} from "data/observable";
import {Inject, Component, View} from 'angular2/core';
import {Page} from "../../decorators/page";
import {Logger} from "../../providers/logger";
import {Router} from "angular2/router";
// @Component({
//     selector: "startPage",
//     templateUrl: "startPage.xml"
// })
@Page({
    selector: "start",
    templateUrl: "pages/startPage/startPage.html"
})
export class StartPage 
{
    private hit : number = 0; 
    constructor(private logger:Logger, private router: Router)
    {
        this.logger.Notify("Start Page - constructor hit");   
    }
    
    public pageLoaded(): void {
        this.logger.Notify("start page - loaded");
        console.log("start page - loaded - i happen alot?");
    }
    public loadRegions() : void{
        this.logger.Notify("time to load regions");
        
        let promise: Promise<any, any> = this.router.navigate(["Regions"]);
        promise.then(() => {
            this.logger.Notify("Should have navigated from start -> regions");
        });
        promise.catch(() => {
            this.logger.Notify("I failed navigating from start -> regions");
        });
    }
}


//var vmModule = require("./main-view-model");
// export function pageLoaded(args) {
//     var page = args.object;
//     var vm = new startPage();
//     page.bindingContext = vm;
// }

//exports.pageLoaded = pageLoaded;
