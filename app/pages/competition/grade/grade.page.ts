import "rxjs/add/operator/max";
import "rxjs/add/operator/distinct";

import * as Models from "../../../models/models";
import * as Rx from "rxjs";

import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";

import {AppRoutingService} from "../../../context/router.context";
import {ClubService} from "../../../providers/leagues/clubService";
import {CompetitionCache} from "../../../providers/leagues/competitionCache";
import {CompetitionNav} from "../../nav/competition.nav";
import {CompetitionService} from "../../../providers/leagues/competitionService";
import {CompetitorResult} from "../../templates/competitor.results";
import {CompetitorService} from "../../../providers/leagues/competitorService";
import {GradeService} from "../../../providers/leagues/gradeService";
import {Logger} from "../../../providers/logger";
import { Observable } from "rxjs";

@Component({
    selector: "grade-competitors-page",
    template: `
        <nx-drawer>
            <competition-nav drawer-aside-left></competition-nav>
            <nx-nav>
                <label class="title" [text]="'Competitors' | Title" style="horizontal-align:center"></label>
                <ion-icon nav-right nav="true" icon="ion-android-favorite"></ion-icon>
            </nx-nav>

            <StackLayout class="inset">
                <nx-list>
                    <PullToRefresh [pull-list-view]
                        (refreshStarted)="refreshStarted($event)"
                        (refreshCompleted)="refreshCompleted()">
                        <ListView [items]="list|async" [pull-to-animate]>
                            <template let-item="item">
                                <competitor-result [competitor]="item"></competitor-result>
                            </template>
                        </ListView>
                    </PullToRefresh>


                </nx-list>
            </StackLayout>
        </nx-drawer>
    `,
    providers: [CompetitionService, GradeService, ClubService, CompetitorService],
})
export class GradeCompetitorsPage implements OnInit {
    constructor(
        private logger: Logger,
        private gradeService: GradeService,
        private competitorService: CompetitorService,
        private context: AppRoutingService,
        private cache: CompetitionCache) {
        this.logger.Notify("grade list page started");
    }

    public list: Observable<Models.ICompetitorContext[]>;

    public gradeSearch($event: any): void {
        this.logger.Notify("Search passed to region");
        this.logger.Notify($event);
    }

    public ngOnInit(): void {
        this.logger.Notify("grade-page ngOnInit");

        this.loadDetail();
    }

    public loadDetail(): Observable<Models.ICompetitor[]> {
        let obseravable: Observable<Models.ICompetitor[]> = this.competitorService
            .ListGradeCompetitors(this.context.CompetitionId, this.context.GradeId);

        let viewModel = obseravable
            .map((e) => {
                let list: Models.ICompetitor[] = e.sort((a,b) => {
                    return a.FinalRank - b.FinalRank;
                });
                return list;
            })
            .map((e : Models.ICompetitor[]) => {
                let contexts: Models.ICompetitorContext[] = e.map(item => {
                    return {
                        Expanded : false,
                        Competitor : item
                    };
                });
                return contexts;
            });

        this.list = viewModel;

        return obseravable;
    }

    public refreshStarted(args: any): void {
        this.logger.Notify("Grade: refresh starting");
        this.loadDetail().subscribe(() => {
            args.completed();
        });
    }

    public refreshCompleted(): void {
        this.logger.Notify("Grade: refresh completed");
    }

}