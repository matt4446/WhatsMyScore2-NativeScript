//import {Injectable} from 'angular2/core';
import {Observable, Subscription, Subject} from 'rxjs/Rx';
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
} 