import * as Models from "../../../models/models";

import {Component, OnInit} from "@angular/core";
import { IGrade, IGroup } from "../../../models/models";
import { Observable, ReplaySubject, Subject, Subscription } from "rxjs/Rx";

import {AppRoutingService} from "../../../context/router.context";
import {ClubService} from "../../../providers/leagues/clubService";
import {CompetitionCache} from "../../../providers/leagues/competitionCache";
import {CompetitionNav} from "../../nav/competition.nav";
import {CompetitionService} from "../../../providers/leagues/competitionService";
import {GradeService} from "../../../providers/leagues/gradeService";
import {GroupedObservable} from "rxjs/operator/groupBy";
import {Logger} from "../../../providers/logger";
import {StartListItems} from "./start.list.items.control";

@Component({
    selector: "start-list-page",
    template: `
        <nx-drawer>
            <competition-nav drawer-aside-left></competition-nav>

            <nx-nav>
                <label class="title" [text]="'Start List' | Title" style="horizontal-align:center"></label>
                <ion-icon nav-right nav="true" icon="ion-android-favorite"></ion-icon>
            </nx-nav>

            <nx-content (refreshStarted)="refresh($event)">
                <StackLayout class="inset">
                    <nx-list *ngFor="let group of list|async">
                        <nx-header item-top>
                            <label [text]="group.Key | Title" class="title"></label>
                        </nx-header>

                        <nx-item *ngFor="let grade of group.Items | async"
                            [nsRouterLink]="[grade.Id]" animate="true" pageTransition="slide">

                            <nx-icon item-left icon="assignment"></nx-icon>

                            <label [text]="grade.ClassName"></label>
                            <label class="note" [text]="grade.Competitors + ' competitors' "></label>

                            <nx-icon item-right icon="chevron_right"></nx-icon>

                        </nx-item>
                    </nx-list>
                </StackLayout>
            </nx-content>

        </nx-drawer>
    `,
    providers: [CompetitionService, GradeService, ClubService],
})
export class StartListPage implements OnInit {
    constructor(
        private logger: Logger,
        private context: AppRoutingService,
        private cache: CompetitionCache,
        private gradeService : GradeService) {
    }

    public list : Observable<IGroup<IGrade>[]>;

    public gradeSearch($event : any): void {
        this.logger.Notify("Search passed to start list");
        this.logger.Notify($event);
    }

    private CreateViewModel(grades: Observable<IGrade[]>): void {

        var groupMap: Observable<IGroup<IGrade>[]> = grades
            .flatMap(e=> e)
            .groupBy((x)=> x.Discipline)
            .map(disciplineGroups => {
                let items = disciplineGroups.publishReplay().refCount().toArray();

                let group : IGroup<IGrade> = {
                    Key: disciplineGroups.key,
                    Items: items
                };

                group.Items.subscribe(y=> {
                    this.logger.Notify(`${disciplineGroups.key}: ${y.length}`);
                });
                return group;
            }).toArray();

        this.list = groupMap;
        this.list.subscribe(x => {
            this.logger.Notify(`groups: ${x.length}`);
        });
    }

    public ngOnInit():void {
        this.logger.Notify("start-list-page ngOnInit");

        if(this.cache.HasGrades()) {
            var items : Observable<IGrade[]> = Observable.of(this.cache.Grades);

            this.CreateViewModel(items)           ;

            return;
        }

        this.loadDetail();
    }

    public loadDetail(): Observable<IGrade[]> {
        let observable : Observable<IGrade[]> = this.gradeService
            .List(this.context.CompetitionId);

        this.CreateViewModel(observable);

        return observable;
    }

    public refresh(args: any): void {
        this.loadDetail().subscribe(() => {
            args.completed();
        });
    }
}