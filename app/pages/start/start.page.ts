import {Component, Inject, OnInit} from '@angular/core';
import {Headers, Http, RequestOptionsArgs} from "@angular/http";

import {ActionItem} from "ui/action-bar";
import {AppRoutingService} from '../../context/router.context';
import {Logger} from "../../providers/logger";
import {NxDrawer} from "../../controls/drawer/drawer";
import {PageRoute} from 'nativescript-angular';
import {Settings} from "../../providers/routes/routes";
import {StartListControl} from "./stat.list.start.control";
import {StartListSearchControl} from "./start.list.search.control";
import {StartNav} from "../nav/start.nav.control";
import {alert} from "ui/dialogs";

//import {Observable, EventData } from "data/observable";


@Component({
    selector: "start",
    templateUrl: "pages/start/start.page.html",
})
export class StartPage implements OnInit
{
    constructor(private logger:Logger, 
        private http: Http, 
        private appRouteingService: AppRoutingService
        )
    {
        this.logger.Notify("Start Page - constructor hit"); 
    }
    
    ngOnInit()
    {

        // let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        // headers.append('Accept', 'text/xml');
        // headers.append('Accept-Encoding', 'deflate')
        // var requestObtionsArgs : RequestOptionsArgs= { 
        //     headers: headers,
        //     withCredentials: true
        // };

        // this.http.get("https://breakouttrampoliningwebservices.azurewebsites.net/test/string", requestObtionsArgs)
        //     .map(e=> e.text())
        //     .subscribe(e => {
        //         console.log("expect: Hello world! Time is: {0}");
        //         console.log(e);
        //     }, (e) => {
        //         console.log(e);
        //     });
        // this.http.get("https://breakouttrampoliningwebservices.azurewebsites.net/test/number", requestObtionsArgs)
        //     .map(e=> e.text())
        //     .subscribe(e => {
        //         console.log(e);
        //     }, (e) => {
        //         console.log(e);
        //     });
        // this.http.get("https://breakouttrampoliningwebservices.azurewebsites.net/test/guid", requestObtionsArgs)
            
        //     .map(e=> e.text())
        //     .subscribe(e => {
        //         console.log(e);
        //     }, (e) => {
        //         console.log(e);
        //     });

       
    }

  
    public refresh(args: any){
        setTimeout(()=> {
            args.completed();
        }, 1000);
        
    }
}
