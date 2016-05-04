import {Injectable} from "@angular/core";
import {Logger} from "../logger";
import {Settings} from "../routes/routes";
import {ICompetition, IGrade} from "../../models/models";
import {CompetitionCache, GradeCache} from "./cache";

@Injectable()
export class GradeService 
{
    constructor(private http: Http, private logger: Logger,
        private competitionCache : CompetitionCache,
        private gradeCache: GradeCache)
    {
        logger.Notify("ProviderService created");
    }
    
    public Get(competitionId: number, gradeId: number){
        let base = Settings.WebApiBaseUrl;
        let route = base + "/Api/Competitions/" + competitionId;
        route+= "/Group/" + gradeId;
        
        let promise = this.http.get(route);
        
        this.logger.NotifyResponse(promise);
        
        promise.map(response => response.json()).subscribe((grade : IGrade) => {
            this.gradeCache.Grade = grade;
        });
        
        return promise;
    }
    
    public List(competitionId: number)
    {
        let base = Settings.WebApiBaseUrl;
        let route = base + "/Api/Competition/" + competitionId + "/Grades";
        
        let promise = this.http.get(route);
        
        this.logger.NotifyResponse(promise);
        
        
        promise.map(response => response.json()).subscribe((grades : Array<IGrade>) => {
            this.competitionCache.Grades = grades;
        });
        
        return promise;
    }
    
}