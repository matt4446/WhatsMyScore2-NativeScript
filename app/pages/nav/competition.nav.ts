import {Component, Inject} from "@angular/core";
import {EventData, Observable} from "data/observable";

import {Logger} from "../../providers/logger";
import {Settings} from "../../providers/routes/routes";
import {alert} from "ui/dialogs";

@Component({
    selector: "competition-nav",
    templateUrl: "pages/nav/competition.nav.html"
})
export class CompetitionNav {
    constructor(private logger:Logger) {
        this.logger.Notify("competition-nav - constructor hit");
    }
}
