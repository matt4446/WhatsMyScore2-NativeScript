import {AppRoutingService, IClubRoute, ICompetitionRoute, IGradeRoute, IRegionRoute} from "../../context/router.context";
import {Component, Injectable, OnInit} from "@angular/core";
import {IClub, ICompetitionGrades, IGrade} from "../../models/models";
import {Observable, Subject, Subscription} from "rxjs/Rx";

import {ClubService} from "./clubService";
import {CompetitionCache} from "./competitionCache";
import {CompetitionService} from "./competitionService";
import {GradeService} from "./gradeService";
import {GroupedObservable} from "rxjs/operator/groupBy";
import {Logger} from "../../providers/logger";

@Injectable()
export class DisplayService {

    constructor(
        private logger: Logger,
        private context: AppRoutingService,
        private competitionCache: CompetitionCache,
        private gradeService : GradeService,
        private clubService : ClubService) {
    }

    // public GetOrderedClubs(context: IClubRoute, refresh: boolean): Observable<IClub[]> {
    //     let clubResults : Observable<IClub[]>;
    //     let useCache: boolean = this.competitionCache.HasClubs();

    //     clubResults = useCache
    //         ? Observable.of(this.competitionCache.Clubs)
    //         : this.clubService.List(this.context.ClubId);

    //     return clubResults;
    // }

    // public GetOrderedGrades(context: IGradeRoute, refresh: boolean): Observable<IGrade[]> {

    //     let gradeResults : Observable<IGrade[]>;
    //     let useCache: boolean = this.competitionCache.HasGrades();

    //     gradeResults = useCache
    //         ? Observable.of(this.competitionCache.Grades)
    //         : this.gradeService.List(this.context.CompetitionId);

    //     let grouped = gradeResults.groupBy(e=> e.Discipline, e=> e).map(group=> {
    //         let grades : IGrade[] = [];

    //         group.subscribe(k => {
    //             grades.push(k);
    //         }, (error) => {

    //         }, () => {
    //             let orderedGrades = grades.sort((a,b) =>
    //                 a.ClassName.toLowerCase() < b.ClassName.toLowerCase() ? -1 : a.ClassName > b.ClassName ? 1 : 0
    //             );
    //             grades = orderedGrades;
    //         });

    //         return {
    //             Discipline : group.key,
    //             Grades : grades
    //         };
    //     });

    //     return grouped.toArray();
    // }


}