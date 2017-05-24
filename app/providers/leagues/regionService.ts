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
    }

    public Get(regionId: any): Observable<IRegion> {
        let base: string = Settings.WebApiBaseUrl;
        let route: string = `${base}/api/Providers/Get/${regionId}`;

        let request: Observable<Response> = this.http.get(route);
        let result: Observable<IRegion> = request.map(response => response.json());

        result.subscribe((region : IRegion) => {
            this.cache.Region = region;
        });

        return result;
    }

    public List(): Observable<IRegion[]> {
        let base: string = Settings.WebApiBaseUrl;
        let route: string  = `${base}/Api/Providers/List/Enabled`;

        let request: Observable<Response> = this.http.get(route);
        let result: Observable<IRegion[]> = request.map(response => response.json());

        result.subscribe((regions: IRegion[]) => {
            this.cache.Regions = regions;
        });

        return result;
    }

}