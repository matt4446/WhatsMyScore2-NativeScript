//import {Injectable} from 'angular2/core';
import {Observable, Subscription, Subject} from 'rxjs/Rx';
import {Http, Response} from "angular2/http";

interface ILogMessage {
    level : string;
    message : string;
}

const debugLevel = "Notify";
const errorLevel = "Error";
//@Injectable()
export class Logger
{
    private distinctLog: Subject<ILogMessage> = new Subject<ILogMessage>();
    
    constructor(){
        let varients = this.distinctLog;
        
        let notifyStream = varients
            .filter((x) => x.level == debugLevel)
            .distinctUntilChanged((x,y) => x===y)
            .map(e=> e.message)
            .subscribe((msg) => {
                
                console.log("=Debug===============");
                console.log(msg);
                console.log("======================");
                
            });
            
        let errorStream = varients
            .filter(x=> x.level == errorLevel)
            .distinctUntilChanged((x,y) => x===y)
            .map(e=> e.message)
            .subscribe((msg) => {
                    
                    console.log("*ERROR*****************");
                    console.log(msg);
                    console.log("**********************");
                    
                });
    }
    
    public Notify(message: string)
    { 
        this.distinctLog.next({
            level: debugLevel,
            message: message
        });
    }
    
    public Error(message: string)
    {
        this.distinctLog.next({
            level: errorLevel,
            message: message
        });
    }
    
    public NotifyObjectProperties(object: any){
        for(let item in object){
            console.log("Property: " + item);
        }
    }
    
    public NotifyResponse(requestObservable: Observable<Response>)
    {
        var subscription = requestObservable.subscribe(response => {
            this.Notify("response:");
            this.Notify(response.text());
        });
    }
} 