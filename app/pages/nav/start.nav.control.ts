import {Component, Inject} from '@angular/core';
import {EventData, Observable} from "data/observable";

import {Logger} from "../../providers/logger";
import {NxDrawer} from "../../controls/drawer/drawer";
import {Settings} from "../../providers/routes/routes";
import {StartListControl} from "../start/stat.list.start.control";
import {StartListSearchControl} from "../start/start.list.search.control";
import {alert} from "ui/dialogs";

@Component({
    moduleId: module.id,
    selector: "start-nav",
    templateUrl: "start.nav.control.html",
})
export class StartNav
{
    
    constructor(private logger:Logger)
    {
        this.logger.Notify("Start Page - constructor hit"); 
    }
        
    public loadRegions(args: EventData) : void{
        this.logger.Notify("time to load regions");
        
        
        // let promise: Promise<any> = this.router.navigate(["Regions"]);
        
        // promise.then(() => {
        //     this.logger.Notify("I Should have navigated from start -> regions");
        // });
        
        // promise.catch(() => {
        //     this.logger.Notify("I failed navigating from start -> regions");
        // });
    }
    
    
    
}


//var vmModule = require("./main-view-model");
// export function pageLoaded(args) {
//     var page = args.object;
//     var vm = new startPage();
//     page.bindingContext = vm;
// }

//exports.pageLoaded = pageLoaded;
