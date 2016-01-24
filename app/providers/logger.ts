//import {Injectable} from 'angular2/core';
import {Observable, Subscription, Subject} from 'rxjs/Rx';
import {Http, Response} from "angular2/http";

//@Injectable()
export class Logger
{
    private distinctLog: Subject<string> = new Subject<string>();
    
    constructor(){
        this.distinctLog
            .distinctUntilChanged((x,y) => x===y)
            .subscribe((msg) => {
                
                console.log("======================");
                console.log(msg);
                console.log("======================");
            });
            
        
    }
    
    public Notify(message: string)
    {
        this.distinctLog.next(message);
    }
    
    public NotifyResponse(requestObservable: Observable<Response>)
    {
        var subscription = requestObservable.subscribe(response => {
            this.Notify("response:");
            this.Notify(response.text());
        });
    }
} 