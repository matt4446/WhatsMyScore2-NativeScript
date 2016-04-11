import {Http, Response} from "angular2/http";
import {Logger} from "../logger";
import {Settings} from "../routes/routes";
import {ICompetition, IClub} from "../../models/models";
import {CompetitionCache, ClubCache} from "./cache";

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
        
        promise.map(response => response.json()).subscribe((club : IClub) => {
            this.clubCache.Club = club;
        });
        
        return promise;
    }
    
    public List(competitionId: number)
    {
        let base = Settings.WebApiBaseUrl;
        let route = base + "Api/Competition/" + competitionId;
        route += "/Clubs";
        
        let promise = this.http.get(route);
        
        promise.map(response => response.json()).subscribe((clubs : Array<IClub>) => {
            this.competitionCache.Clubs = clubs;
        });
        
        return promise;
    }
    
}