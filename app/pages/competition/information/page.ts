import {Component} from 'angular2/core';
import {Router} from "angular2/router";
import {Page} from "../../../decorators/page";
import {Logger} from "../../../providers/logger";
import {AppRoutingService} from "../../../context/router.context";
//import {SearchList, ISearchEvent} from "../../controls/searchList/searchList";
import {CompetitionService} from "../../../providers/leagues/competitions";
import {GradeService} from "../../../providers/leagues/grade";
import {RegionCache, CompetitionCache, GradeCache, ClubCache} from "../../../providers/leagues/cache";
import {ClubService} from "../../../providers/leagues/club";
import {ICompetition} from "../../../models/models"

@Page({
    selector: "grade-list-page",
    templateUrl: "pages/competition/information/page.html",
    template: `
        <nx-drawer>
            <competition-nav drawer-aside-left></competition-nav>
            
            <nx-nav>
                <label class="nx-header-title" text="Information" style="horizontal-align:center"></label>
                <ion-icon nav-right nav="true" icon="ion-android-favorite"></ion-icon>
            </nx-nav>

            <nx-content (refreshStarted)="refresh($event)">
                <StackLayout class="inset">
                    <nx-list>
                        <nx-header item-top>
                            <label [text]="'information' | Title" class="nx-header-title"></label>
                        </nx-header>
                        <nx-item>
                            <label text="Information"></label>
                        </nx-item>
                    </nx-list>
                </StackLayout>
            </nx-content>
            
        </nx-drawer>
    `,
    providers: [CompetitionService, GradeService, ClubService]
})
export class InformationPage 
{
    constructor(
        private logger: Logger,
        private context: AppRoutingService,
        private competitionCache: CompetitionCache,
        private competitionService: CompetitionService)
    {

        this.logger.Notify("grade list page started");
    }
    
    public competition : any;

    
    //passed to the child component
    public regionsHintText = "Hi from regions";
    
    //action to 
    public regionSearch($event : any)
    {
        this.logger.Notify("Search passed to region");
        this.logger.Notify($event);
        //this.logger.Notify("Search Term in Regions Page: " + $event.Value);
    } 
    
    /* angular2 lifecycle */
    public ngOnInit(){
        this.logger.Notify("Region-page ngAfterViewInit");
        if(this.competitionCache.Competition){
            this.competition = this.competitionCache.Competition;
            return;
        }
        this.loadDetail();
    }
    
    public loadDetail(){
        let competitionId = this.context.CompetitionId;
        let observable = this.competitionService.Get(competitionId);
        
        observable
            .map((response)=> response.json())
            .subscribe((competition : ICompetition) => { 
                this.competitionCache.Competition = competition;
            }, (error)=> {
                this.logger.Error(error);
            });
            
        return observable;
    }
    
    public refresh(args: any){
        this.loadDetail().subscribe(() => {
            args.completed();
        });
    }
   
    
}