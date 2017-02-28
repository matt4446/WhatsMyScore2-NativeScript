import {BehaviorSubject, Observable, Subscription} from 'rxjs/Rx';
import {ICompetition, IRegion} from "../../models/models";

import {CompetitionCache} from './competitionCache';
import {Http} from "@angular/http";
import {Injectable} from '@angular/core';
import {Logger} from "../logger";
import {Settings} from "../routes/routes";

@Injectable()
export class CompetitionService{
    
    constructor(private http: Http, private logger: Logger, private competitionCache: CompetitionCache){
        logger.Notify("ProviderService created");
    }
    
    public Get(competitionId: string){
        
        let base = Settings.WebApiBaseUrl;
        let endpoint = "/Api/Competition/" + competitionId;
        let route = base + endpoint;
        
        this.logger.Notify("Load :" + route);
        
        let promise = this.http.get(route);
        
        promise.map(response => response.json()).subscribe((competition : ICompetition) => {
            this.competitionCache.Competition = competition;
        });
        
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