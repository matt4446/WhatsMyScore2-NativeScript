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

import {ClubCache} from "./clubCache";
import {GradeCache} from "./gradeCache";

@Injectable()
export class CompetitionCache {

    public CompetitionChanges = new Rx.BehaviorSubject<ICompetition>(null);

    constructor(
        public clubCache: ClubCache,
        public gradeCache: GradeCache) {
    }

    private competition: ICompetition;
    public get Competition(): ICompetition {
        return this.competition;
    }
    public set Competition(value: ICompetition) {
        if (this.competition && value) {
            // if different then invalidate current values and collections.
            if (this.competition.Id !== value.Id) {

                this.Grades = null;
                this.Clubs = null;

                this.clubCache.Club = null;
                this.gradeCache.Grade = null;
            }
        }

        this.competition = value;
        this.CompetitionChanges.next(this.competition);
    }

    private grades: Array<IGrade>;
    public get Grades(): Array <IGrade> {
        return  this.grades;
    }
    public set Grades(value: Array <IGrade>) {
        this.grades = value;
    }

    private clubs: Array < IClub >;
    public get Clubs(): Array<IClub> {
        return this.clubs;
    }
    public set Clubs(value: Array<IClub>) {
        this.clubs = value;
    }

}