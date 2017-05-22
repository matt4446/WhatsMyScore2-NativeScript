import {Component, OnInit} from "@angular/core";

import {AppRoutingService} from "../../../context/router.context";
import {ClubService} from "../../../providers/leagues/clubService";
import {CompetitionNav} from "../../nav/competition.nav";
import {CompetitionService} from "../../../providers/leagues/competitionService";
import {GradeService} from "../../../providers/leagues/gradeService";
import {Logger} from "../../../providers/logger";

@Component({
    selector: "find-competitor-page",
    moduleId: module.id,
    template: `
        <nx-drawer>
            <competition-nav drawer-aside-left></competition-nav>

            <nx-nav>
                <label class="nx-header-title" [text]="'Find Competitors' | Title" style="horizontal-align:center"></label>
                <ion-icon nav-right nav="true" icon="ion-android-favorite"></ion-icon>
            </nx-nav>

            <nx-content (refreshStarted)="refresh($event)">
                <StackLayout class="inset">
                    <nx-list *ngFor="let clubGroup of list | groupBy: 'Letter' | orderBy:'key'">
                        <nx-header item-top>
                            <label [text]="clubGroup.key" class="nx-header-title"></label>
                        </nx-header>

                        <nx-item *ngFor="let club of clubGroup.items | orderBy:'Name'">
                            <ion-icon item-left icon="ion-clipboard"></ion-icon>
                            <label [text]="club.Name"></label>
                            <ion-icon item-right icon="ion-ios-people"></ion-icon>
                            <label item-right class="note" [text]="club.Competitors"></label>
                        </nx-item>
                    </nx-list>
                </StackLayout>
            </nx-content>

        </nx-drawer>
    `,
    providers: [CompetitionService, GradeService, ClubService]
})
export class FindCompetitorPage {

    constructor(
        private logger: Logger,
        private context: AppRoutingService) {

        this.logger.Notify("grade list page started");
    }

    public list : Array<any> = [];
}