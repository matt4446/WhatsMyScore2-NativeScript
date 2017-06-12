import {Http, Response} from "@angular/http";
import {IClub, ICompetition, ICompetitor} from "../../models/models";

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
    }

    public Get(competitionId: number, clubId: number): Observable<IClub> {
        let base: string = Settings.WebApiBaseUrl;
        let route: string = base + `${base}/Api/Competitions/${competitionId}/Clubs/${clubId}`;
        let promise: Observable<Response> = this.http.get(route);
        let result: Observable<IClub> = promise.map(response => response.json());

        //this.logger.NotifyResponse(promise);

        result.subscribe((club) => {
            this.clubCache.Club = club;
        });

        return result;
    }

    public List(competitionId: number): Observable<IClub[]> {
        this.logger.Notify(`load clubs from ${competitionId}`);
        let base: string = Settings.WebApiBaseUrl;
        let route: string = `${base}/Api/Competition/${competitionId}/Clubs`;
        let request: Observable<Response> = this.http.get(route);
        let result: Observable<IClub[]> = request.map(response => response.json());

        this.logger.NotifyResponse(request);

        result.subscribe((clubs : Array<IClub>) => {
            this.competitionCache.Clubs = clubs;
        });

        return result;
    }

    public ListCompetitors(competitionId: number, clubId: number): Observable<ICompetitor[]> {

        let base: string = Settings.WebApiBaseUrl;
        let route: string = `${base}/Api/Competition/${competitionId}/Competitors/Club2/${clubId}`;
        let request: Observable<Response> = this.http.get(route);
        let result: Observable<ICompetitor[]> = request.map(response => response.json());

        this.logger.NotifyResponse(request);

        return result;
    }

}