import * as Rx from "rxjs/Rx";
import * as appSettings from "application-settings";

import {
    IClub,
    ICompetition,
    IGrade,
    IRegion,
}
from "../../models/models";
import { Inject, Injectable } from "@angular/core";

import { AppRoutingService } from "../../context/router.context";

@Injectable()
export class ClubCache {
    public ClubChanges = new Rx.Subject<IClub>();

    private club: IClub;

    public get Club(): IClub {
        return this.club;
    }
    public set Club(value: IClub) {
        this.club = value;
        this.ClubChanges.next(this.club);
    }
}