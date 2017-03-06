import {Injectable} from "@angular/core"
import {Http} from "@angular/http";
import {Settings} from "../routes/routes";
import {Logger} from "../logger";

@Injectable()
export class CompetitorService
{
    constructor(private http : Http, private logger: Logger){
        
    }
    
    public ListGradeCompetitors(competitionId: number, gradeId: number) 
    {
        //var route = kendo.format("Api/Competition/{0}/Competitors/Grade2/{1}", competitionId, gradeId);
        //    route = kendo.format("{0}/{1}", Settings.WebApiBaseUrl, route);
        let base = Settings.WebApiBaseUrl;
        let route = base + "/Api/Competition/{0}/Competitors/Grade2/{1}"
            .replace("{0}", <any>competitionId)
            .replace("{1}", <any>gradeId);
        
        var observable = this.http.get(route);
        
        //this.logger.NotifyResponse(observable);

        return observable;
    }
    
    public ListClubCompetitors(competitionId: number, clubId: number){
        // var route = kendo.format("Api/Competition/{0}/Competitors/Club/{1}", competitionId, clubId);
        //     route = kendo.format("{0}/{1}", Settings.WebApiBaseUrl, route);
        let base = Settings.WebApiBaseUrl;
        let route = base + "/Api/Competition/{0}/Competitors/Club/{1}"
            .replace("{0}", <any>competitionId)
            .replace("{1}", <any>clubId);
            
        var observable = this.http.get(route);
        
        this.logger.NotifyResponse(observable);

        return observable;
    }
}