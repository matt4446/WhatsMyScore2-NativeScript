import {Http, Response} from "@angular/http";
import {IClub, ICompetition} from "../../models/models";

import {AppRoutingService} from "../../context/router.context";
import {ClubCache} from "./clubCache";
import {CompetitionCache} from "./competitionCache";
import {Injectable} from "@angular/core";
import {Logger} from "../logger";
import { Observable } from "rxjs/Rx";
import {Settings} from "../routes/routes";

@Injectable()
export class ClubService {

    constructor(
        private http: Http,
        private logger: Logger,
        private routingService: AppRoutingService,
        private competitionCache: CompetitionCache,
        private clubCache : ClubCache) {
        logger.Notify("ProviderService created");

        Observable.combineLatest(
            this.routingService.CompetitionIdChanging,
            this.routingService.ClubIdChanging
        ).subscribe(values => {
            var competitionId: number = values[0];
            var clubId: number = values[0];

            this.Get(competitionId, clubId);
        });
    }

    public Get(competitionId: number, clubId: number): Observable<IClub> {
        let base: string = Settings.WebApiBaseUrl;
        let route: string = base + `${base}/Api/Competitions/${competitionId}/Clubs/${clubId}`;
        let promise: Observable<Response> = this.http.get(route);
        let result: Observable<IClub> = promise.map(response => response.json());

        this.logger.NotifyResponse(promise);

        result.subscribe((club) => {
            this.clubCache.Club = club;
        });

        return result;
    }

    public List(competitionId: number): Observable<Response> {
        let base: string = Settings.WebApiBaseUrl;
        let route: string = `${base}/Api/Competition/${competitionId}/Clubs`;
        let promise: Observable<Response> = this.http.get(route);

        this.logger.NotifyResponse(promise);

        promise.map(response => response.json()).subscribe((clubs : Array<IClub>) => {
            this.competitionCache.Clubs = clubs;
        });

        return promise;
    }

    public ListCompetitors(competitionId: number, clubId: number): Observable<Response> {
        let base: string = Settings.WebApiBaseUrl;
        let route: string = `${base}/Api/Competition/${competitionId}/Competitors/Club2/${clubId}`;
        let promise: Observable<Response> = this.http.get(route);

        this.logger.NotifyResponse(promise);

        return promise;
    }

}