import {ICompetition, IRegion} from "../models/models"

import {Injectable} from '@angular/core';
import {Logger} from "../providers/logger"
import {PageRoute} from 'nativescript-angular';

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

@Injectable()
export class AppRoutingService implements IRegionRoute, ICompetitionRoute, IGradeRoute, IClubRoute
{
    public RegionId : any;
    public CompetitionId: any;
    public GradeId : any;
    public ClubId : any;
    
    constructor(private pageRoute: PageRoute, private logger: Logger)
    {
        logger.Notify("AppRoutingService created");
        this.pageRoute.activatedRoute
            .switchMap(activatedRoute => activatedRoute.params)
            .forEach((params) => { 
                this.RegionId = params['regionId'];
                this.CompetitionId = params["competitionId"];
                this.GradeId = params["gradeId"];
                this.ClubId = params["clubId"];


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

            });
        
        
    } 
    
}