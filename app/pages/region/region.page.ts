import {Component, OnDestroy, OnInit} from "@angular/core";
import {ICompetition, IRegion} from "../../models/models";
import {Observable, Subscription} from "rxjs";

import {ActivatedRoute} from "@angular/router";
import {AppRoutingService} from "../../context/router.context";
import {CompetitionService} from "../../providers/leagues/competitionService";
import {Logger} from "../../providers/logger";
import {PullToRefresh} from "nativescript-pulltorefresh";
import {RegionCache} from "../../providers/leagues/regionCache";
import { RegionService } from "../../providers/leagues/regionService";
import {StartNav} from "../nav/start.nav.control";

@Component({
    selector: "Region",
    moduleId: module.id,
	templateUrl: "region.page.html"
})
export class RegionPage implements OnInit {
    constructor(
        private context : AppRoutingService,
        private logger: Logger,
        private regionCache: RegionCache,
        private regionService: RegionService,
        private competitionService: CompetitionService) {

        this.logger.Notify("region page loaded");
    }

    public list : Observable<ICompetition[]>;
    public region : Observable<IRegion>;

    public refresh(args: any): void {
        let control : PullToRefresh = args.object;

        this.loadDetail().subscribe(() => {
            args.completed();
        });
    }

    private loadDetail(): Observable<any> {
        let regionObservable: Observable<IRegion> = this.regionService
            .Get(this.context.RegionId);
        let competitionsObservable: Observable<ICompetition[]> = this.competitionService
            .List(this.context.RegionId);

        this.region = regionObservable;
        this.list = competitionsObservable;

        return Observable.combineLatest(regionObservable, competitionsObservable);
    }

    private regionSubscription: Subscription;

    ngOnInit(): void {
        this.logger.Notify(`ngOnInit: RegionPage ${this.context.RegionId}`);
        this.region = this.regionCache.RegionChange.filter(e=> e !== null);

        this.loadDetail();
    }
}

