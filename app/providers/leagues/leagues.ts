import {Injectable} from 'angular2/core';
import {Http, Response} from "angular2/http";

import {Logger} from "../logger";
import {IRegion} from "../../models/models";
import {Settings} from "../routes/routes";
import {Observable, Subscription, BehaviorSubject} from 'rxjs/Rx';
import {RegionCache} from "./cache"

@Injectable()
export class ProviderService{
    
    
    constructor(private http: Http, private logger: Logger, private cache: RegionCache){
        logger.Notify("ProviderService created");
    }
    
    public Get(regionId: any){
        
        let base = Settings.WebApiBaseUrl;
        let endpoint = "/api/Providers/Get/";
        let route = base + endpoint + regionId;
        
        this.logger.Notify("Load :" + route);
        
        let promise = this.http.get(route);
        
        promise.map(response => response.json()).subscribe((region : IRegion) => {
            this.cache.Region = region;
        });
        
        this.logger.NotifyResponse(promise);
                
        return promise;
    }
 
    public List() {
        let base = Settings.WebApiBaseUrl;
        let endpoint  = "/Api/Providers/List/Enabled";
        let route = base + endpoint;
        
        this.logger.Notify("Load :" + route);
        
        //var observableRequest = this.http.get(route);
        let observableRequest = this.http.get(route);
        
        this.logger.NotifyResponse(observableRequest);
        
        return observableRequest;
    }
   
}

// export class ProviderService {
//     private $http: ng.IHttpService;
// 
//     constructor($http) {
//         this.$http = $http;
//     }
// 
//     public Get(providerId: number): angular.IHttpPromise<Models.IProvider> {
//         var route = "api/Providers/Get/{0}";
//         route = kendo.format(route, providerId);
//         route = kendo.format("{0}/{1}", Settings.WebApiBaseUrl, route);
// 
//         Logger.Notify("route: " + route);
// 
//         var promise = this.$http.get(route);
// 
//         return promise;
//     }
// 
//     public List(): angular.IHttpPromise<Models.IProvider[]> {
//         var route = "Api/Providers/List/Enabled";
//         route = kendo.format("{0}/{1}", Settings.WebApiBaseUrl, route);
// 
//         var promise = this.$http.get(route);
// 
//         return promise;
//     }
// }