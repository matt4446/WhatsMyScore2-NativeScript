import {BehaviorSubject, Observable, Subscription} from 'rxjs/Rx';

import {Http} from "@angular/http";
import {IRegion} from "../../models/models";
import {Injectable} from '@angular/core';
import {Logger} from "../logger";
import {RegionCache} from './regionCache';
import {Settings} from "../routes/routes";

@Injectable()
export class RegionService{
        
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
        let promise = this.http.get(route);
        
        promise.map(response => response.json()).subscribe((regions: IRegion[]) => {
            this.cache.Regions = regions;
        });
        
        this.logger.NotifyResponse(promise);
        
        return promise;
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