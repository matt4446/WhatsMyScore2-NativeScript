import {Injectable} from "@angular/core";
import {Logger} from "../logger";
import {Settings} from "../routes/routes";
import {ICompetition, IClub} from "../../models/models";
import {CompetitionCache, ClubCache} from "./cache";

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
    
}