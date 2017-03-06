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