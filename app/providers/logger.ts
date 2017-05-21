import {Observable, Subject, Subscription} from "rxjs/Rx";

import { Injectable } from "@angular/core";
import {Response} from "@angular/http";

interface ILogMessage {
    level: string;
    message: string;
}

const debugLevel: string = "Notify";
const errorLevel: string = "Error";

@Injectable()
export class Logger {
    private distinctLog: Subject<ILogMessage> = new Subject<ILogMessage>();

    constructor() {
        let varients = this.distinctLog;

        let notifyStream = varients
            .filter((x) => x.level === debugLevel)
            .distinctUntilChanged((x, y) => x === y)
            .map(e=> e.message)
            .subscribe((msg) => {
                var d : Date = new Date();
                var ds : string = d.toISOString();
                console.log("=Debug===============");
                console.log(ds + ": " + msg);
                console.log("======================");
            });

        let errorStream = varients
            .filter(x=> x.level === errorLevel)
            .distinctUntilChanged((x, y) => x === y)
            .map(e=> e.message)
            .subscribe((msg) => {
                console.log("*ERROR*****************");
                console.log(msg);
                console.log("**********************");
            });
    }

    public Notify(message: string): void {
        this.distinctLog.next({
            level: debugLevel,
            message: message
        });
    }

    public NotifyObject(object: any): void {
        let s: string = JSON.stringify(object);
        this.distinctLog.next({
            level: debugLevel,
            message: s
        });
    }

    public NotifyArray(items: any[]): void {
        for(let i : number = 0; i<items.length; i++) {
            this.Notify("i="+i + " " + this.ObjextAsString(items[i]));
        }
    }

    public NotifyObservableArray(items : Observable<Array<any>>): void {
        items.subscribe(x=> this.NotifyArray(x));
    }

    public Error(message: string): void {
        this.distinctLog.next({
            level: errorLevel,
            message: message
        });
    }

    public NotifyObjectProperties(object: any): void {
        for (let item in object) {
             if (object.hasOwnProperty(item)) {
             console.log("Property: " + item);
             }
        }
    }

    public NotifyResponse(requestObservable: Observable<Response>): void {
        var subscription = requestObservable.subscribe(response => {
            let text = response.text();
            let json = response.json();


            let jsonAsText = JSON.stringify(json);
            this.Notify(jsonAsText);
        });
    }

    private ObjextAsString(any : any): string {
        return JSON.stringify(any);
    }
}