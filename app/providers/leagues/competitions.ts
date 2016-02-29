import {Injectable} from 'angular2/core';
import {Http, Response} from "angular2/http";

import {Logger} from "../logger";
import {IProvider} from "../../models/models";
import {Settings} from "../routes/routes";
import {Observable, Subscription, BehaviorSubject} from 'rxjs/Rx';

@Injectable()
export class CompetitionService{
    
    constructor(private http: Http, private logger: Logger){
        logger.Notify("ProviderService created");
    }
    
    public Get(regionId: string){
        
        let base = Settings.WebApiBaseUrl;
        let endpoint = "/Api/Competition/" + regionId;
        let route = base + endpoint;
        
        this.logger.Notify("Load :" + route);
        
        let promise = this.http.get(route);
        
        this.logger.NotifyResponse(promise);
                
        return promise;
    }
 
    public List(regionId: string) {
        let base = Settings.WebApiBaseUrl;

        let endpoint  = "/Api/Providers/" + regionId + "/Competitions/Enabled";
        let route = base + endpoint;
        
        this.logger.Notify("Load :" + route);
        
        //var observableRequest = this.http.get(route);
        let observableRequest = this.http.get(route);
        
        this.logger.NotifyResponse(observableRequest);
        
        return observableRequest;
    }
   
}