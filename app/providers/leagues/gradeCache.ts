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