import * as Providers from "../../providers/providers.ref";

import { Component, OnInit, ViewChild } from "@angular/core";

import { IRegion } from "../../models/models";
import { Logger } from "../../providers/logger";
import { Observable } from "rxjs/Rx";
import { StartNav } from "../nav/start.nav.control";

@Component({
    selector: "regions-page",
    moduleId: module.id,
    templateUrl: "regions.page.html",
    providers: [ Providers.RegionService],
})
export class RegionsPage implements OnInit {
    constructor(
        private logger: Logger,
        private regions: Providers.RegionService) {
        this.logger.Notify("Regions page started");
    }

    public list : Array<IRegion> = [];

    public regionSearch($event : any): void {
        this.logger.Notify("Search passed to region");
        this.logger.Notify($event);
    }

    public refresh(args: any): void {
        this.logger.Notify("regions page refresh => load data");
        this.loadDetail().subscribe(() => {
            args.completed();
        });
    }

    public loadDetail(): Observable<any> {
        this.logger.Notify("load regions");

        let response : Observable<IRegion[]> = this.regions.List();

        response
            .subscribe((items) => {
                this.list = items;
            },(error) => {
                this.logger.Error("Could not load items");
                this.logger.Error(error);
            });

        return response;
    }

    public ngOnInit(): void {
        this.loadDetail();
    }

}