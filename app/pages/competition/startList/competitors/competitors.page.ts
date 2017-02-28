import 'rxjs/add/operator/max';
import 'rxjs/add/operator/distinct';

import * as Models from "../../../../models/models";
import * as Rx from "rxjs";
import * as _ from 'lodash';

import {Component, Input, OnInit} from '@angular/core';

import {AppRoutingService} from "../../../../context/router.context";
import {ClubService} from "../../../../providers/leagues/club";
import {CompetitionCache} from '../../../../providers/leagues/competitionCache';
import {CompetitionNav} from "../../../nav/competition.nav";
import {CompetitionService} from "../../../../providers/leagues/competitions";
import {CompetitorService} from "../../../../providers/leagues/competitors";
import {GradeService} from "../../../../providers/leagues/grade";
import {Logger} from "../../../../providers/logger";

@Component({
    selector: "start-group-list",
    template: `
        <!--
        <ListView [items]="startGroup">
            <template let-person="item">
                <nx-item>
                    <label item-left [text]="person.StartNumber"></label>
                                    
                    <label [text]="person.FullName"></label>
                    <label [text]="person.Club" class="note"></label>
                </nx-item>
            </template>
        </ListView>
        -->
        <nx-item *ngFor="let person of startGroup">
            <label item-left [text]="person.StartNumber"></label>
                            
            <label [text]="person.FullName"></label>
            <label [text]="person.Club" class="note"></label>
        </nx-item>

    `
})
export class StartGroup{
    @Input("data")
    public set data(value: Models.ICompetitor[]){
        this.startGroup = value;
        this.logger.Notify("items in group: " + value.length);
    }
    public startGroup: Models.ICompetitor[];

    constructor(private logger: Logger){
        
    }
}

@Component({
    selector: "start-list-grade-page",
    //templateUrl: "pages/competition/gradeList/page.html",
    template: `
        <nx-drawer>
            <competition-nav drawer-aside-left></competition-nav>
            <nx-nav>
                <label class="nx-header-title" [text]="'Competitors' | Title" style="horizontal-align:center"></label>
                <ion-icon nav-right nav="true" icon="ion-android-favorite"></ion-icon>
            </nx-nav>
            <!--
            <GridLayout>
                <StackLayout class="inset">
                    
                
                <PullToRefresh [pull-list-view] 
                    (refreshStarted)="refreshStarted($event)"
                    (refreshCompleted)="refreshCompleted()">
                    <ListView [items]="groupedStartList" [pull-to-animate]>
                        <template let-item="item">
                           <nx-list>
                                <nx-header item-top>
                                    <label *ngIf="groups > 1" [text]="'StartGroup: ' + item.key | Title" class="nx-header-title"></label>
                                    <label *ngIf="groups <= 1" [text]="'StartGroup'| Title" class="nx-header-title"></label>
                                </nx-header>
                                <start-group-list [data]="item.items"></start-group-list>
                           </nx-list> 
                        </template>
                    </ListView>
                </PullToRefresh>
	            </StackLayout>
                <material-fab text="face" vertical-align="top" horizontal-align="right"></material-fab>

            </GridLayout>
            -->

            
            <nx-content (refreshStarted)="refresh($event)">
                <GridLayout>
                    <StackLayout class="inset">
                        <nx-list *ngFor="let startGroup of groupedStartList">
                            <nx-header item-top>
                                <label *ngIf="groups > 1" [text]="'StartGroup: ' + startGroup.key | Title" class="nx-header-title"></label>
                                <label *ngIf="groups <= 1" [text]="'StartGroup'| Title" class="nx-header-title"></label>
                            </nx-header>
                            <nx-item *ngFor="let person of startGroup.items | orderBy:'StartNumber'">
                                <label item-left [text]="person.StartNumber"></label>
                                                
                                <label [text]="person.FullName"></label>
                                <label [text]="person.Club" class="note"></label>
                                <!-- todo : change to score. --> 
                                <ion-icon item-right icon="ion-flame"></ion-icon>
                                <Label class='note' item-right [text]="person.Total | number:'3.3-3'" textWrap="true"></Label>
                                
                            </nx-item>
                        </nx-list>
                    </StackLayout>
                    <material-fab text="face" vertical-align="top" horizontal-align="right"></material-fab>
                </GridLayout>
                
            </nx-content>
            
        </nx-drawer>
    `,
    providers: [CompetitionService, GradeService, ClubService, CompetitorService]
})
export class StartListGradePage implements OnInit
{
    constructor(
        private logger: Logger, 
        private gradeService: GradeService,
        private competitorService : CompetitorService,
        private context: AppRoutingService,
        private cache: CompetitionCache)
    {
        this.logger.Notify("grade list page started");
    }
    
    public groupedStartList : Models.IGroupOfItem<Models.ICompetitor>[];
    public orderedCompetitors : Models.ICompetitor[] = [];
    public startList : Models.IGroupOfItem<Models.ICompetitor>;
    //public groups : number = 0; //if more than one group change the label

    public get groups (){
        return this.orderedCompetitors.length;
    }

    //action to 
    public gradeSearch($event : any)
    {
        this.logger.Notify("Search passed to region");
        this.logger.Notify($event);
        //this.logger.Notify("Search Term in Regions Page: " + $event.Value);
    } 
    
    public ngOnInit(){
        this.logger.Notify("grade-list-page ngOnInit");
        //time to load the data
        
        this.loadDetail();
    }
    
    public refresh(args: any){
        var observable = this.loadDetail();
        observable.subscribe(() => {
            args.completed();
        }, () => {
            args.completed();
        })        
    }

    public loadDetail(){
        let obseravable = this.competitorService.ListGradeCompetitors(this.context.CompetitionId, this.context.GradeId);
        
        //this.logger.NotifyResponse(obseravable);
        
        obseravable.map(e=> e.json()).subscribe((e : Models.ICompetitor[]) => {
            this.logger.Notify("sort competitiors : " + e.length);

            this.orderedCompetitors = e.sort((a,b) => {

                if(a.StartGroup == b.StartGroup){
                    return a.StartNumber < b.StartNumber ? -1 : 1 ;
                }

                return a.StartGroup < b.StartGroup ? -1 : 1
            });

            this.logger.Notify("sorted: " + this.orderedCompetitors.length);

            let maxStartGroup = 0 ;
            let startListGroups: Models.IGroupOfItem<Models.ICompetitor>[] = 
                this.groupedStartList = [];

            this.logger.Notify("group");

            for(let i=0;i<this.orderedCompetitors.length;i++)
            {
                let item = this.orderedCompetitors[i];
                let collection = startListGroups.filter(e=> e.key === item.StartGroup);

                if(item.StartGroup > maxStartGroup)
                {
                    maxStartGroup = item.StartGroup; 
                }

                if(collection.length > 0){
                    let group = collection[0];
                    group.items.push(item);
                }else{
                    startListGroups.push({
                        key: item.StartGroup,
                        items: [item]
                    });
                }

            }

            this.logger.Notify("Start Groups: " + startListGroups.length);
        }, error => {
            this.logger.Notify(error);
        });
        
        return obseravable;
    }
    
    public refreshStarted(args: any){
        this.loadDetail().subscribe(() => {
            args.completed();
        });
    }
    public refreshCompleted(){}
}