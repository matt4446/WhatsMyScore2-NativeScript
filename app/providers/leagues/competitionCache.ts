import * as Rx from 'rxjs/Rx';
import * as appSettings from "application-settings";

import {
    IClub,
    ICompetition,
    IGrade,
    IRegion,
}
from "../../models/models";
import { Inject, Injectable } from '@angular/core';

import {ClubCache} from './clubCache';
import {GradeCache} from './gradeCache';

@Injectable()
export class CompetitionCache {

    public CompetitionChanges = new Rx.BehaviorSubject<ICompetition>(null);
    
    constructor(
        public clubCache: ClubCache, 
        public gradeCache: GradeCache){
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