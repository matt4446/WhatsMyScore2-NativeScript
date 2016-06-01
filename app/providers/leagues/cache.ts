import { Injectable, Inject } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import * as appSettings from "application-settings"; 
import {
    IRegion,
    ICompetition,
    IClub,
    IGrade
}
from "../../models/models";

@Injectable()
export class RegionCache {
    public RegionsChange : Rx.Subject<IRegion[]> = new Rx.Subject<IRegion[]>(); 
    public RegionChange : Rx.Subject<IRegion> = new Rx.Subject<IRegion>();
    
    //region 
    private _region : IRegion; 

    public get Region(): IRegion {
        return this._region;
    }
    public set Region(value: IRegion){
        this._region = value;
    }
    
    
    //regions
    private _regions : IRegion[]; 
    
    public get Regions(): IRegion[] {
        return this._regions;
    }
    public set Regions(value : IRegion[]){
        this._regions = value;
        this.RegionsChange.next(this._regions);
    }
    
    constructor() {

    }
}

@Injectable()
export class ClubCache {
    public ClubChanges = new Rx.Subject<IClub>();
    
    private _club: IClub;
    
    public get Club(): IClub {
        return this._club;
    }
    public set Club(value: IClub) {
        this._club = value;
        this.ClubChanges.next(this._club);
    }
}

@Injectable()
export class GradeCache {
    public GradeChanges = new Rx.Subject<IGrade>();
    
    private _grade: IGrade;
    public get Grade(): IGrade {
        return this._grade;
    }
    public set Grade(value: IGrade) {
        this._grade = value;
        this.GradeChanges.next(this._grade);
    }
}

@Injectable()
export class CompetitionCache {

    public CompetitionChanges = new Rx.BehaviorSubject<ICompetition>(null);
    
    constructor(
        @Inject(ClubCache) public clubCache: ClubCache, 
        @Inject(GradeCache) public gradeCache: GradeCache){
    }

    private _competiton: ICompetition;
    public get Competition(): ICompetition {
        return this._competiton;
    }
    public set Competition(value: ICompetition) {
        if (this._competiton && value) {
            //if its different from the previous data invalidate current values and collections. 
            if (this._competiton.Id !== value.Id) {
                this.Grades = null;
                this.Clubs = null;
                this.clubCache.Club = null;
                this.gradeCache.Grade = null;
            }
        }

        this._competiton = value;
        this.CompetitionChanges.next(this._competiton);
    }

    private _grades: Array<IGrade>;
    public get Grades(): Array <IGrade> {
        return  this._grades;
    }
    public set Grades(value: Array <IGrade>) {
        this._grades = value;
    } 
    
    private _clubs: Array < IClub >; 
    public get Clubs(): Array<IClub> {
        return this._clubs;
    }
    public set Clubs(value: Array<IClub>) {
        this._clubs = value;
    }

}