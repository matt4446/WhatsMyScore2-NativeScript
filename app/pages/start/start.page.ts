import {Observable, EventData } from "data/observable";
import {alert} from "ui/dialogs";

import {Inject, Component, OnInit } from 'angular2/core';
import {Page} from "../../decorators/page";
import {Logger} from "../../providers/logger";
import {Router} from "angular2/router";

import {Http} from 'angular2/http';
import {Settings} from "../../providers/routes/routes";
import {NxDrawer} from "../../controls/drawer/drawer";
import {StartNav} from "../nav/start.nav.control";
import {topmost} from "ui/frame";
import {ActionItem} from "ui/action-bar";

@Page({
    selector: "start",
    //I've moved directives to Page decorator .. 
    templateUrl: "pages/start/start.page.html",
    directives: [StartNav]
})
export class StartPage implements OnInit
{
    constructor(private logger:Logger)
    {
        this.logger.Notify("Start Page - constructor hit"); 
    }
    
    ngOnInit()
    {
    }

    public incomplete(args: EventData) : void {
        alert("Its not made yet");
    }
  
    public refresh(args: any){
        setTimeout(()=> {
            args.completed();
        }, 1000);
        
    }
}
