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