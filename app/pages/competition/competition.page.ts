import { Component, OnInit, OnDestroy } from '@angular/core';

import {Logger} from "../../providers/logger";
import {CompetitionService} from "../../providers/leagues/competitions";

import {GradeService} from "../../providers/leagues/grade";
import {RegionCache, CompetitionCache, GradeCache, ClubCache} from "../../providers/leagues/cache";

import {ClubService} from "../../providers/leagues/club";
import {ICompetition} from "../../models/models"
import {CompetitionNav} from "../nav/competition.nav";
import {AppRoutingService} from "../../context/router.context";
import * as Rx from 'rxjs/Rx';

@Component({
    selector: "Competiton",
	templateUrl: "pages/competition/competition.page.html",
    providers: [CompetitionService, GradeService, ClubService]
})
export class CompetitionPage implements OnInit, OnDestroy
{
    constructor(
        private logger: Logger, 
        private context: AppRoutingService,
        private competitionCache: CompetitionCache,
        private competitionService: CompetitionService,
        private clubService: ClubService,
        private gradeService: GradeService)
    {
        this.logger.Notify("a competition is being loaded");
    }
  
    public list : Array<ICompetition> = []; 
    public subscriptions : Rx.Subscription[] = [];
    
    ngOnDestroy(){
        this.subscriptions.forEach((subscription)=> {
            subscription.unsubscribe();    
        });
    }
    
    ngOnInit()
    {
        this.logger.Notify("ngOnInit: CompetitionPage");
        this.loadCompetition(); 
        this.loadCompetitionDetails(); 
    } 
    
    public loadCompetitionDetails (){
        
        let detailSubscription = this.competitionCache.CompetitionChanges.filter(e=> e!== null).subscribe(competition => {
            this.logger.Notify("competition changed... load club and grade");
            this.logger.NotifyObject(competition);
            
            let clubObservable = this.clubService.List(competition.Id);
            let gradeObservable = this.gradeService.List(competition.Id);
            
            clubObservable.map(e=> e.json()).subscribe(e  => {
                this.competitionCache.Clubs = e;
            });
            gradeObservable.map(e=> e.json()).subscribe(e=> {
                this.competitionCache.Grades = e;
            });
        });
        
        this.subscriptions.push(detailSubscription);
    }
    
    public loadCompetition (){
        let competitionId = this.context.CompetitionId;
        
        let observable = this.competitionService.Get(competitionId);
        
        // already done at the service
        // observable
        //     .map((response)=> response.json())
        //     .subscribe((competition : ICompetition) => { 
        //         this.competitionCache.Competition = competition;
        //     }, (error)=> {
        //         this.logger.Error(error);
        //     });
            
        return observable;
    }
        
    public refresh(args: any){      
        this.loadCompetition().subscribe(() => {
            args.completed();
        });
    }
}

