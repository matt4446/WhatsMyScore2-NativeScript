import { Injectable, Inject } from 'angular2/core';
import { Observable, Subscription, Subject} from 'rxjs/Rx';
import {
    IRegion,
    ICompetition,
    IClub,
    IGrade
}
from "../../models/models";

@Injectable()
export class RegionCache {
    private _region : IRegion; 
    public get Region(): IRegion {
        return this._region;
    }
    public set Region(value: IRegion){
        this._region = value;
    }
   
    constructor() {

    }
}

@Injectable()
export class ClubCache {
    public ClubChanges = new Subject<IClub>();
    
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
    public GradeChanges = new Subject<IGrade>();
    
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

    public CompetitionChanges = new Subject<ICompetition>();
    

    constructor(
        @Inject(ClubCache) public clubCache: ClubCache, 
        @Inject(GradeCache) public gradeCache: GradeCache){
    }

    private _competiton: ICompetition;
    public get Competition(): ICompetition {
        return this._competiton;
    }
    public set Competition(value: ICompetition) {
        if (this._competiton) {
            if (value) {
                if (this._competiton.Id !== value.Id) {
                    this.Grades = null;
                    this.Clubs = null;
                    this.clubCache.Club = null;
                    this.gradeCache.Grade = null;
                }
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