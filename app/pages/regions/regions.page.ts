import * as Providers from "../../providers/providers.ref";

import { Component, OnInit, ViewChild } from "@angular/core";

import { IRegion } from "../../models/models";
import { Logger } from "../../providers/logger";
import { Observable } from "rxjs/Rx";
import { StartNav } from "../nav/start.nav.control";

@Component({
    selector: "regions-page",
    templateUrl: "pages/regions/regions.page.html",
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

    public loadDetail() {
        this.logger.Notify("load regions");

        let response = this.regions.List();

        // transform the data to json -> array of IProvider
        response
            .map(response => response.json())
            .subscribe((items : Array<IRegion>) => {
                this.list = items;
            },(error) => {
                this.logger.Error("Could not map items");
                this.logger.Error(error);
            });

        return response;
    }


    /* angular2 lifecycle */
    public ngOnInit(): void {
        this.loadDetail();
    }

}