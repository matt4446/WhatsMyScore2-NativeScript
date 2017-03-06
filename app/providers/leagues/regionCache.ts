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



