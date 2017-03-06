import {ActivatedRoute, Router} from '@angular/router';
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

// export let AppRoutingServiceFactory = (pageRoute: PageRoute,logger: Logger) => {
//   return new AppRoutingService(pageRoute, logger);
// };

@Injectable()
export class AppRoutingService implements IRegionRoute, ICompetitionRoute, IGradeRoute, IClubRoute
{
    public RegionId : any;
    public CompetitionId: any;
    public GradeId : any;
    public ClubId : any;
    
    constructor(
        private router: Router,
        private logger: Logger)
    {
        logger.Notify("AppRoutingService created");
        router.events.subscribe((e) => {
            
            this.logger.Notify("router nav");
            //logger.NotifyObject(e);
            //logger.NotifyObject(router.routerState.snapshot);
        });
    } 
    
    public Update(route: ActivatedRoute): void {
        var params = route.params;
        var subscription = params.subscribe((data) => {
            this.logger.NotifyObject(data);

            this.RegionId = data['regionId'];
            this.CompetitionId = data["competitionId"];
            this.GradeId = data["gradeId"];
            this.ClubId = data["clubId"];


            let a = JSON.stringify({
                regionId : this.RegionId,
                competitionId: this.CompetitionId,
                gradeId: this.GradeId,
                clubId: this.ClubId
            });
                    
            this.logger.Notify(a);
            
            if(this.RegionId){
                this.logger.Notify("RegionId: " + this.RegionId);   
            }
            if(this.ClubId){
                this.logger.Notify("ClubId:" + this.ClubId);
            }
            if(this.GradeId){
                this.logger.Notify("regionId:" + this.RegionId);
            }
            if(this.CompetitionId){
                this.logger.Notify("competitionId:" + this.CompetitionId);
            }

        });
        subscription.unsubscribe();

        
    }

}