import {Http, Response} from "@angular/http";
import {IClub, ICompetition} from "../../models/models";

import {ClubCache} from "./clubCache";
import {CompetitionCache} from "./competitionCache";
import {Injectable} from "@angular/core";
import {Logger} from "../logger";
import { Observable } from "rxjs/Rx";
import {Settings} from "../routes/routes";

@Injectable()
export class ClubService {

    constructor(private http: Http, private logger: Logger,
        private competitionCache: CompetitionCache,
        private clubCache : ClubCache) {
        logger.Notify("ProviderService created");
    }

    public Get(competitionId: number, clubId: number): Observable<Response> {
        let base: string = Settings.WebApiBaseUrl;
        let route: string = base + `${base}/Api/Competitions/${competitionId}/Clubs/${clubId}`;
        let promise = this.http.get(route);

        this.logger.NotifyResponse(promise);

        promise.map(response => response.json()).subscribe((club : IClub) => {
            this.clubCache.Club = club;
        });

        return promise;
    }

    public List(competitionId: number): Observable<Response> {
        let base: string = Settings.WebApiBaseUrl;
        let route: string = `${base}/Api/Competition/${competitionId}/Clubs`;
        let promise = this.http.get(route);

        this.logger.NotifyResponse(promise);

        promise.map(response => response.json()).subscribe((clubs : Array<IClub>) => {
            this.competitionCache.Clubs = clubs;
        });

        return promise;
    }

    public ListCompetitors(competitionId: number, clubId: number) {
        let base: string = Settings.WebApiBaseUrl;
        let route: string = `${base}/Api/Competition/${competitionId}/Competitors/Club2/${clubId}`;
        let promise = this.http.get(route);

        this.logger.NotifyResponse(promise);

        return promise;
    }

}