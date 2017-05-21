import {Http, Response} from "@angular/http";

import {Injectable} from "@angular/core";
import {Logger} from "../logger";
import { Observable } from "rxjs/Rx";
import {Settings} from "../routes/routes";

@Injectable()
export class CompetitorService {
    constructor(private http : Http, private logger: Logger) {

    }

    public ListGradeCompetitors(competitionId: number, gradeId: number): Observable<Response> {
        let base: string = Settings.WebApiBaseUrl;
        let route: string = base + `${base}/Api/Competition/${competitionId}/Competitors/Grade2/${gradeId}`;

        var observable = this.http.get(route);

        return observable;
    }

    public ListClubCompetitors(competitionId: number, clubId: number): Observable<Response>  {
        let base: string = Settings.WebApiBaseUrl;
        let route: string = `${base}/Api/Competition/${competitionId}/Competitors/Club/${clubId}`;

        var observable = this.http.get(route);

        this.logger.NotifyResponse(observable);

        return observable;
    }
}