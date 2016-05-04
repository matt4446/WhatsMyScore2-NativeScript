import {RouteParams} from '@angular/router';
import {Logger} from "../providers/logger"
import {IRegion, ICompetition} from "../models/models"

export interface IRegionRoute {
    RegionId : any;
}
export interface ICompetitionRoute {
    CompetitionId: any;
}
export interface IGradeRoute {
    GradeId : any;
}
export interface IClubRoute {
    ClubId : any;
}

export class AppRoutingService implements IRegionRoute, ICompetitionRoute, IGradeRoute, IClubRoute
{
    public RegionId : any;
    public CompetitionId: any;
    public GradeId : any;
    public ClubId : any;
    
    constructor(private routeParams: RouteParams, private logger: Logger)
    {
        logger.Notify("AppRoutingService created");
        
        //this.Context = new RouterContext();
        this.RegionId = this.routeParams.get('regionId');
        this.CompetitionId = this.routeParams.get("competitionId");
        this.GradeId = this.routeParams.get("gradeId");
        this.ClubId = this.routeParams.get("clubId");
        
        let a = JSON.stringify({
            regionId : this.RegionId,
            competitionId: this.CompetitionId,
            gradeId: this.GradeId,
            clubId: this.ClubId
        });
        
        this.logger.Notify(a);
        
        if(this.RegionId){
            logger.Notify("RegionId: " + this.RegionId);   
        }
        if(this.ClubId){
            logger.Notify("ClubId:" + this.ClubId);
        }
        if(this.GradeId){
            logger.Notify("regionId:" + this.RegionId);
        }
        if(this.CompetitionId){
            logger.Notify("competitionId:" + this.CompetitionId);
        }
    } 
    
}