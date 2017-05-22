import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import {BehaviorSubject, Subject} from "rxjs/Rx";
import {ICompetition, IRegion} from "../models/models";

import {Injectable} from "@angular/core";
import {Logger} from "../providers/logger";
import {PageRoute} from "nativescript-angular";

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
export class AppRoutingService implements IRegionRoute, ICompetitionRoute, IGradeRoute, IClubRoute {

    public RegionIdChanging: Subject<number> = new BehaviorSubject<number>(undefined);
    public CompetitionIdChanging: Subject<number> = new BehaviorSubject<number>(undefined);
    public GadeIdChanging: Subject<number> = new BehaviorSubject<number>(undefined);
    public ClubIdChanging: Subject<number> = new BehaviorSubject<number>(undefined);

    private regionId : number;
    public get RegionId(): number {
        return this.regionId;
    }
    public set RegionId(value: number){
        this.logger.Notify(`AppRoutingService: set regionId: ${value}`);
        if(this.regionId === value) {
            return;
        }

        this.RegionIdChanging.next(value);
        this.regionId = value;
    }

    private competitionId: number;
    public get CompetitionId(): number {
        return this.competitionId;
    }
    public set CompetitionId(value: number) {
        if(this.competitionId === value) {
            return;
        }

        this.CompetitionIdChanging.next(value);
        this.competitionId = value;
    }

    private gradeId : number;
    public get GradeId(): number {
        return this.gradeId;
    }
    public set GradeId(value: number) {
        this.GadeIdChanging.next(value);
        this.gradeId = value;
    }

    private clubId : number;
    public get ClubId(): number {
        return this.clubId;
    }
    public set ClubId(value: number){
        this.ClubIdChanging.next(value);
        this.clubId = value;
    }

    constructor(
        private router: Router,
        private logger: Logger) {
        logger.Notify("AppRoutingService created");

        router.events.subscribe((e) => {
            this.logger.Notify(`router nav ${e}`);
        });
        router.events.filter(e=> e instanceof NavigationEnd);

        this.RegionIdChanging
            .filter(e=> e !== undefined)
            .subscribe(e=> {
                this.logger.Notify(`Region should be reloaded as: ${e}`);
            });
    }

    public UpdateFromParams(data : { [key: string]: number }): void {
        this.logger.Notify(`Update Params: ${data}`);
        this.logger.NotifyObject(data);

        this.RegionId = data["regionId"];
        this.CompetitionId = data["competitionId"];
        this.GradeId = data["gradeId"];
        this.ClubId = data["clubId"];

        if(this.RegionId) {
            this.logger.Notify("RegionId: " + this.RegionId);
        }
        if(this.ClubId) {
            this.logger.Notify("ClubId:" + this.ClubId);
        }
        if(this.GradeId) {
            this.logger.Notify("regionId:" + this.RegionId);
        }
        if(this.CompetitionId) {
            this.logger.Notify("competitionId:" + this.CompetitionId);
        }
    }
}