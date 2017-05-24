import {BehaviorSubject, Observable, Subscription} from "rxjs/Rx";
import {Http, Response} from "@angular/http";
import {ICompetition, IRegion} from "../../models/models";

import {CompetitionCache} from "./competitionCache";
import {Injectable} from "@angular/core";
import {Logger} from "../logger";
import {Settings} from "../routes/routes";

@Injectable()
export class CompetitionService {

    constructor(private http: Http, private logger: Logger, private competitionCache: CompetitionCache) {
        logger.Notify("ProviderService created");
    }

    public Get(competitionId: number): Observable<ICompetition> {
        let base: string = Settings.WebApiBaseUrl;
        let route: string = `${base}/Api/Competition/${competitionId}`;

        let rquest: Observable<Response> = this.http.get(route);
        let result: Observable<ICompetition> = rquest.map(response => response.json());

        result.subscribe((competition : ICompetition) => {
            this.competitionCache.Competition = competition;
        });

        this.logger.NotifyResponse(rquest);

        return result;
    }

    public List(regionId: number): Observable<ICompetition[]> {
        let base: string = Settings.WebApiBaseUrl;
        let route: string = `${base}/Api/Providers/${regionId}/Competitions/Enabled`;

        let promise: Observable<Response> = this.http.get(route);
        let result: Observable<ICompetition[]> = promise.map(response => response.json());

        return result;
    }
}