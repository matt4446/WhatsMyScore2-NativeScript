import {Http, Response} from "@angular/http";
import {ICompetition, IGrade} from "../../models/models";

import {CompetitionCache} from "./competitionCache";
import {GradeCache} from "./gradeCache";
import {Injectable} from "@angular/core";
import {Logger} from "../logger";
import { Observable } from "rxjs/Rx";
import {Settings} from "../routes/routes";

@Injectable()
export class GradeService {
    constructor(private http: Http, private logger: Logger,
        private competitionCache : CompetitionCache,
        private gradeCache: GradeCache) {
        logger.Notify("ProviderService created");
    }

    public Get(competitionId: number, gradeId: number): Observable<IGrade> {
        let base: string = Settings.WebApiBaseUrl;
        let route: string = `${base}/Api/Competitions/${competitionId}/Group/${gradeId}`;

        let request: Observable<Response> = this.http.get(route);
        let result: Observable<IGrade> = request.map(response => response.json());

        result.subscribe((grade : IGrade) => {
            this.gradeCache.Grade = grade;
        });
        this.logger.NotifyResponse(request);

        return result;
    }

    public List(competitionId: number): Observable<IGrade[]> {
        let base: string = Settings.WebApiBaseUrl;
        let route: string = `${base}/Api/Competition/${competitionId}/Grades`;

        this.logger.Notify(`load grades from ${competitionId} | '${route}'`);

        let request: Observable<Response> = this.http.get(route);
        let result: Observable<IGrade[]> = request.map(response => response.json());

        result.subscribe((grades : IGrade[]) => {
            this.logger.Notify(`grades loaded: ${grades.length}`);
            this.competitionCache.Grades = grades;
        });

        // this.logger.NotifyResponse(request);

        return result;
    }

}