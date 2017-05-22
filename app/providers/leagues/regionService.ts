import {BehaviorSubject, Observable, Subscription} from "rxjs/Rx";
import {Http, Response} from "@angular/http";

import {AppRoutingService} from "../../context/router.context";
import {IRegion} from "../../models/models";
import {Injectable} from "@angular/core";
import {Logger} from "../logger";
import {RegionCache} from "./regionCache";
import {Settings} from "../routes/routes";

@Injectable()
export class RegionService {
    constructor(
        private http: Http,
        private logger: Logger,
        private routingService: AppRoutingService,
        private cache: RegionCache) {

        logger.Notify("RegionService created");

        routingService
            .RegionIdChanging
            .filter(e=> e !== undefined)
            .distinctUntilChanged((a,b) => a === b)
            .switchMap(e=> this.Get(e).catch(err => Observable.of(undefined)))
            .filter(e=> e !== undefined)
            .subscribe((e) => { 
                this.logger.Notify(`Reloaded ${e.Id} ${e.Name}`);
            });
    }

    public Get(regionId: any): Observable<IRegion> {
        let base: string = Settings.WebApiBaseUrl;
        let route: string = `${base}/api/Providers/Get/${regionId}`;

        let promise: Observable<Response> = this.http.get(route);
        let result: Observable<IRegion> = promise.map(response => response.json());

        result.subscribe((region : IRegion) => {
            this.cache.Region = region;
        });

        this.logger.NotifyResponse(promise);

        return result;
    }

    public List(): Observable<IRegion[]> {
        let base: string = Settings.WebApiBaseUrl;
        let endpoint: string  = "/Api/Providers/List/Enabled";
        let route: string = base + endpoint;

        this.logger.Notify("Load :" + route);

        let promise: Observable<Response> = this.http.get(route);
        let result: Observable<IRegion[]> = promise.map(response => response.json());

        result.subscribe((regions: IRegion[]) => {
            this.cache.Regions = regions;
        });

        //this.logger.NotifyResponse(promise);

        return result;
    }

}