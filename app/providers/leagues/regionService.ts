import {BehaviorSubject, Observable, Subscription} from "rxjs/Rx";
import {Http, Response} from "@angular/http";

import {IRegion} from "../../models/models";
import {Injectable} from "@angular/core";
import {Logger} from "../logger";
import {RegionCache} from "./regionCache";
import {Settings} from "../routes/routes";

@Injectable()
export class RegionService {
    constructor(private http: Http, private logger: Logger, private cache: RegionCache){
        logger.Notify("ProviderService created");
    }

    public Get(regionId: any): Observable<Response> {
        let base: string = Settings.WebApiBaseUrl;
        let endpoint: string = "/api/Providers/Get/";
        let route: string = base + endpoint + regionId;

        this.logger.Notify("Load :" + route);

        let promise: Observable<Response> = this.http.get(route);
        promise.map(response => response.json()).subscribe((region : IRegion) => {
            this.cache.Region = region;
        });

        this.logger.NotifyResponse(promise);

        return promise;
    }

    public List(): Observable<Response> {
        let base: string = Settings.WebApiBaseUrl;
        let endpoint: string  = "/Api/Providers/List/Enabled";
        let route: string = base + endpoint;

        this.logger.Notify("Load :" + route);

        let promise: Observable<Response> = this.http.get(route);

        promise.map(response => response.json()).subscribe((regions: IRegion[]) => {
            this.cache.Regions = regions;
        });

        this.logger.NotifyResponse(promise);

        return promise;
    }

}