import {Http, Response} from "@angular/http";

import {ICompetitor} from "../../models/models";
import {Injectable} from "@angular/core";
import {Logger} from "../logger";
import { Observable } from "rxjs/Rx";
import {Settings} from "../routes/routes";

@Injectable()
export class CompetitorService {
    constructor(private http : Http, private logger: Logger) {

    }

    public ListGradeCompetitors(competitionId: number, gradeId: number): Observable<ICompetitor[]> {
        let base: string = Settings.WebApiBaseUrl;
        let route: string = `${base}/Api/Competition/${competitionId}/Competitors/Grade2/${gradeId}`;

        let observable: Observable<Response> = this.http.get(route);
        let result: Observable<ICompetitor[]> = observable.map(e=> e.json());

        return result;
    }

    public ListClubCompetitors(competitionId: number, clubId: number): Observable<ICompetitor[]>  {
        let base: string = Settings.WebApiBaseUrl;
        let route: string = `${base}/Api/Competition/${competitionId}/Competitors/Club/${clubId}`;

        let observable: Observable<Response> = this.http.get(route);
        let result: Observable<ICompetitor[]> = observable.map(e=> e.json());
        // this.logger.NotifyResponse(observable);

        return result;
    }
}