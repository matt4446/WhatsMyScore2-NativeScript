import * as Models from "../../../models/models";

import {Component, OnInit} from '@angular/core';

import {AppRoutingService} from "../../../context/router.context";
import {ClubService} from "../../../providers/leagues/club";
import {CompetitionCache} from '../../../providers/leagues/competitionCache';
import {CompetitionNav} from "../../nav/competition.nav";
import {CompetitionService} from "../../../providers/leagues/competitions";
import {CompetitorResult} from "../../templates/competitor.results";
import {GradeService} from "../../../providers/leagues/grade";
import {Logger} from "../../../providers/logger";

@Component({
    selector: "club-list-page",
    //templateUrl: "pages/competition/clubList/page.html",
    template: `
        <nx-drawer>
            <competition-nav drawer-aside-left></competition-nav>
            
            <nx-nav>
                <label class="nx-header-title" [text]="'Club' | Title" style="horizontal-align:center"></label>
                <ion-icon nav-right nav="true" icon="ion-android-favorite"></ion-icon>
            </nx-nav>

            <nx-content (refreshStarted)="refresh($event)">
                <StackLayout class="inset">
                    <nx-list *ngFor="let group of list | orderBy:'key'">
                        <!-- {"Competitor":{"FullName":"Katherine Allot & Dayle Walker","Club":"Bath","Group":"SS1","Class":null,"Team":null,"Competition":"Synchro"} -->
                        <nx-header item-top>
                            <!-- grade name --> 
                            <label [text]="group.key" class="nx-header-title"></label>
                        </nx-header>
                        <!-- competitors in that grade --> 

                        <competitor-result *ngFor="let item of group.items" [competitor]="item"></competitor-result>

                        
                    </nx-list>
                </StackLayout>
            </nx-content>
            
        </nx-drawer>
    `,
    providers: [CompetitionService, GradeService, ClubService]
})
export class ClubPage implements OnInit
{
    
    constructor(
        private logger: Logger, 
        private clubService: ClubService,
        private context: AppRoutingService,
        private cache: CompetitionCache)
    {
        this.logger.Notify("club page started");
    }
    
    //public list : Models.ICompetitor[] = [];
    //public list: Models.ICompetitorContext[] = [];
    public list: Models.IGroupOfItem<Models.ICompetitorContext>[];

    //action to 
    public clubSearch($event : any)
    {
        this.logger.Notify("Search passed to region");
        this.logger.Notify($event);
        //this.logger.Notify("Search Term in Regions Page: " + $event.Value);
    } 
    
    public ngOnInit(){
        this.logger.Notify("club-page ngOnInit");

        this.loadDetail();
    }
    
    public loadDetail() {
        let observable = this.clubService
            .ListCompetitors(this.context.CompetitionId, this.context.ClubId)
            .map(e=> e.json());
        
        observable.subscribe((e : Models.ICompetitor[])=> {
            var projection : Models.ICompetitorContext[] = e.map((competitor) => {
                let item : Models.ICompetitorContext = {
                    Expanded : false,
                    Competitor: competitor
                };
                return item;
            });

            this.list = this.groupByCompetition(projection);
        });
        
        return observable;
    }
    
    public refresh(args: any){      
        this.loadDetail().subscribe(() => {
            args.completed();
        });
    }
    
    private groupByCompetition(items: Models.ICompetitorContext[]){
        let groups : Models.IGroupOfItem<Models.ICompetitorContext>[] = [];

        items.forEach(item => {
            let existing = groups.filter(e=> e.key === item.Competitor.Group);
            
            if(existing.length > 0){
                existing[0].items.push(item);
                return;
            }

            groups.push({
                key : item.Competitor.Group,
                items: [ item ]
            });
        });

        // this.list.forEach(item => {
        //     item.
        // });

        return groups;
    }
}