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
})
export class RegionsPage implements OnInit {
    constructor(
        private logger: Logger,
        private regions: Providers.RegionService) {
    }

    public list : Observable<IRegion[]>;

    public refresh(args: any): void {
        this.logger.Notify("regions page refresh => load data");
        this.loadDetail().subscribe(() => {
            this.logger.Notify("load regions completed");
            args.completed();
        });
    }

    public loadDetail(): Observable<any> {
        this.logger.Notify("load regions");

        this.list = this.regions.List();

        return this.list;
    }

    public ngOnInit(): void {
        this.loadDetail();
    }

}