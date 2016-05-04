import {Observable, EventData } from "data/observable";
import {alert} from "ui/dialogs";

import {Inject, Component} from '@angular/core';
import {PageControl} from "../../decorators/pageControl";
import {Logger} from "../../providers/logger";
import {Router} from "@angular/router";


import {Settings} from "../../providers/routes/routes";

@PageControl({
    selector: "competition-nav",
    templateUrl: "pages/nav/competition.nav.html"
})
export class CompetitionNav
{
    constructor(private logger:Logger, private router: Router)
    {
        this.logger.Notify("competition-nav - constructor hit"); 
    }
}
