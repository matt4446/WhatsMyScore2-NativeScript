import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs/Rx";

import {AppRoutingService} from "../../context/router.context";
import {ClubService} from "../../providers/leagues/clubService";
import {CompetitionCache} from "../../providers/leagues/competitionCache";
import {CompetitionNav} from "../nav/competition.nav";
import {CompetitionService} from "../../providers/leagues/competitionService";
import {GradeService} from "../../providers/leagues/gradeService";
import {ICompetition} from "../../models/models";
import {Logger} from "../../providers/logger";

@Component({
    selector: "Competiton",
	templateUrl: "pages/competition/competition.page.html",
    providers: [CompetitionService, GradeService, ClubService]
})
export class CompetitionLayout implements OnInit, OnDestroy {
    private subscription: Subscription;

    constructor(
        private logger: Logger,
        private context: AppRoutingService,
        private competitionCache: CompetitionCache,
        private competitionService: CompetitionService,
        private clubService: ClubService,
        private gradeService: GradeService) {

        this.logger.Notify("region page loaded");

        let subscription = this.competitionCache.CompetitionChanges.subscribe(competition => {
            this.logger.Notify("competition changed... load club and grade");
            this.logger.NotifyObject(competition);

            let clubObservable = this.clubService.List(competition.Id);
            let gradeObservable = this.gradeService.List(competition.Id);

            clubObservable.map(e=> e.json()).subscribe(e  => {
                this.competitionCache.Clubs = e;
            });
            gradeObservable.map(e=> e.json()).subscribe(e=> {
                this.competitionCache.Grades = e;
            });
        });

        this.subscription = subscription;
    }

    public list : Array<ICompetition> = [];

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    ngOnInit(): void {
        this.logger.Notify("ngOnInit: competition-layout");
        this.loadDetail();
    }

    public loadDetail(): Observable<ICompetition> {
        let competitionId: number = this.context.CompetitionId;
        let observable: Observable<ICompetition> = this.competitionService.Get(competitionId);

        observable
            .subscribe((competition : ICompetition) => {
                this.competitionCache.Competition = competition;
            }, (error)=> {
                this.logger.Error(error);
            });

        return observable;
    }

    public refresh(args: any): void {
        this.loadDetail().subscribe(() => {
            args.completed();
        });
    }
}

