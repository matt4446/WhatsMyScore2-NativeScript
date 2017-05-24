import * as Rx from "rxjs/Rx";

import { Component, OnDestroy, OnInit } from "@angular/core";
import { IClub, ICompetition, IGrade } from "../../models/models";

import {AppRoutingService} from "../../context/router.context";
import {ClubService} from "../../providers/leagues/clubService";
import {CompetitionCache} from "../../providers/leagues/competitionCache";
import {CompetitionNav} from "../nav/competition.nav";
import {CompetitionService} from "../../providers/leagues/competitionService";
import {GradeService} from "../../providers/leagues/gradeService";
import {Logger} from "../../providers/logger";
import { Observable } from "rxjs/Rx";

@Component({
    selector: "Competiton",
    moduleId: module.id,
	templateUrl: "competition.page.html"
})
export class CompetitionPage implements OnInit {
    constructor(
        private logger: Logger,
        private context: AppRoutingService,
        private competitionCache: CompetitionCache,
        private competitionService: CompetitionService,
        private clubService: ClubService,
        private gradeService: GradeService) {
    }

    public competition : Observable<ICompetition>;
    public gradeCount : Observable<number>;
    public clubCount : Observable<number>;
    public competitorCount : Observable<number>;

    ngOnInit(): void {
        this.logger.Notify("ngOnInit: CompetitionPage");
        this.loadCompetitionDetails();
    }

    public loadCompetitionDetails(): Observable<any> {
        let competitionId: number = this.context.CompetitionId;

        this.competition = this.competitionService.Get(competitionId);
        this.clubCount = this.clubService.List(competitionId).map(e=> e.length);
        let gradeList = this.gradeService.List(competitionId);
        this.gradeCount = gradeList.map(e=> e.length);
        this.competitorCount = gradeList.map(e=> {
            let competitors = e.map(a => a.Competitors);
            let total = competitors.reduce((a,b) => a+=b );
            return total;
        });

        let forAll: Observable<any> = Observable.combineLatest(this.competition, this.clubCount, this.gradeCount);

        return forAll; // .combineLatest(observable,clubsObservable,gradesObservable);
    }

    public refresh(args: any): void {
        this.loadCompetitionDetails().subscribe(() => {
            args.completed();
        });
    }
}

