import {Observable, EventData } from "data/observable";
import {alert} from "ui/dialogs";

import {Inject, Component} from '@angular/core';
import {Logger} from "../../providers/logger";


import {Settings} from "../../providers/routes/routes";

@Component({
    selector: "competition-nav",
    templateUrl: "pages/nav/competition.nav.html"
})
export class CompetitionNav
{
    constructor(private logger:Logger)
    {
        this.logger.Notify("competition-nav - constructor hit"); 
    }
}
