import {IClub, ICompetition} from "../../models/models";

import {ClubCache} from './clubCache';
import {CompetitionCache} from './competitionCache';
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Logger} from "../logger";
import {Settings} from "../routes/routes";

@Injectable()
export class ClubService 
{
    constructor(private http: Http, private logger: Logger, 
        private competitionCache: CompetitionCache, 
        private clubCache : ClubCache){
        logger.Notify("ProviderService created");
    }
    
    public Get(competitionId: number, clubId: number){
        let base = Settings.WebApiBaseUrl;
        let route = base + "/Api/Competitions/" + competitionId;
        route+= "/Clubs/" + clubId;
        
        let promise = this.http.get(route);
        this.logger.NotifyResponse(promise);
        
        promise.map(response => response.json()).subscribe((club : IClub) => {
            this.clubCache.Club = club;
        });
        
        return promise;
    }
    
    public List(competitionId: number)
    {
        let base = Settings.WebApiBaseUrl;
        let route = base + "/Api/Competition/" + competitionId;
        route += "/Clubs";
        
        let promise = this.http.get(route);
        
        this.logger.NotifyResponse(promise);
        
        promise.map(response => response.json()).subscribe((clubs : Array<IClub>) => {
            this.competitionCache.Clubs = clubs;
        });
        
        return promise;
    }

    public ListCompetitors(competitionId: number, clubId: number){
        //var route = kendo.format("{0}/Api/Competition/{1}/Competitors/Club2/{2}", Settings.WebApiBaseUrl, this.competitionId, this.clubId);
        //var promise = this.$http.get(route);
        let base = Settings.WebApiBaseUrl;
        let route = "{0}/Api/Competition/{1}/Competitors/Club2/{2}";
        route = route
            .replace("{0}", base)
            .replace("{1}", <any>competitionId)
            .replace("{2}", <any>clubId);

        let promise = this.http.get(route);
        this.logger.NotifyResponse(promise);

        return promise;
    }
    
}