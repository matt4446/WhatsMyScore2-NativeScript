import {Inject, Component, OnInit } from '@angular/core';
import {Http, RequestOptionsArgs, Headers} from "@angular/http";

//import {Observable, EventData } from "data/observable";
import {alert} from "ui/dialogs";
import {ActionItem} from "ui/action-bar";

import {Logger} from "../../providers/logger";

import {Settings} from "../../providers/routes/routes";
import {NxDrawer} from "../../controls/drawer/drawer";
import {StartNav} from "../nav/start.nav.control";

import {StartListControl} from "./stat.list.start.control";
import {StartListSearchControl} from "./start.list.search.control";

@Component({
    selector: "start",
    templateUrl: "pages/start/start.page.html",
})
export class StartPage implements OnInit
{
    constructor(private logger:Logger, private http: Http)
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
