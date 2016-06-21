import 'reflect-metadata';
import {RouteConfig} from "@angular/router-deprecated";
//decorators
import {App} from "./decorators/app";
//pages 
//level 1 
import { StatsPage } from "./pages/competition/stats/stats.page";
import { TestPage } from "./pages/test/test.page";
import { ParallaxTestPage } from "./pages/test/parallax.page";
import { StartPage } from "./pages/start/start.page";
import { RegionsPage } from "./pages/regions/regions.page";
import { RegionPage } from "./pages/region/region.page";
//level 2
import { CompetitionPage } from "./pages/competition/competition.page";

//level 3
import { ClubListPage } from "./pages/competition/clubList/club.list.page";
import { FindCompetitorPage } from "./pages/competition/findCompetitor/find.competitor.page";
import { GradeListPage } from "./pages/competition/gradeList/grade.list.page";
import { InformationPage } from "./pages/competition/information/information.page";
import { StartListPage } from "./pages/competition/startList/start.list.page";

//level 4
import {StartListGradePage } from "./pages/competition/startList/competitors/competitors.page";
import {ClubPage} from "./pages/competition/club/club.page";
import {GradeCompetitorsPage} from "./pages/competition/grade/grade.page";


//providers 
import {Logger} from "./providers/logger";
import {RegionCache, CompetitionCache, GradeCache, ClubCache} from "./providers/leagues/cache";



//level 1 
@RouteConfig([
    { path: "/", component: StartPage, name: "Start" },
    { path: "/test", component : TestPage, name: "Test" },
    { path: "/test2", component : ParallaxTestPage, name: "ParallaxTestPage" },
    { path: "/regions", component: RegionsPage, name: "Regions" },
    { path: "/region/:regionId", component: RegionPage, name: "Region" }
])


/* 
    region picked - new navigation level 
    child route of Region 
    /regions/1/...
*/
//level 2 
@RouteConfig([
    { path: "/region/:regionId/competition/:competitionId", component: CompetitionPage, name: "Region.Competition" },
])
/* 
    competition for a region is picked - new navigation level
    child route of Region.Competition :  
    /regions/1/competition/1/...
*/

//level 3
@RouteConfig([
    //to-do - template & provider
    { path: "/region/:regionId/competition/:competitionId/information", component: InformationPage, name: "Region.Competition.Information" },

    { path: "/region/:regionId/competition/:competitionId/startList", component: StartListPage, name : "Region.Competition.StartList"},

    { path: "/region/:regionId/competition/:competitionId/clubList", component: ClubListPage, name: "Region.Competition.ClubList"},

    { path: "/region/:regionId/competition/:competitionId/gradeList", component: GradeListPage, name : "Region.Competition.GradeList" },
    //to-do - template & provider
    { path: "/region/:regionId/competition/:competitionId/findCompetitor", component: FindCompetitorPage, name: "Region.Competition.FindCompetitor"},
    //to-do - template & provider
    { path: "/region/:regionId/competition/:competitionId/stats", component: StatsPage, name: "Region.Competition.Stats"},
])

/* 
    competition for a region is picked - new navigation level
    child route of Region.Competition :  
    /regions/1/competition/1/startlist/1/competitors...
    /regions/1/competition/1/grade/1/competitors...
    /regions/1/competition/1/club/1/competitors...
*/
//level 4 
@RouteConfig([
    //to-do - template & provider
    { path: "/region/:regionId/competition/:competitionId/startList/:gradeId/competitors", component: StartListGradePage, name: "Region.Competition.StartList.Competitors"},
    //to-do - template & provider
    { path: "/region/:regionId/competition/:competitionId/grade/:gradeId/competitors", component: GradeCompetitorsPage, name : "Region.Competition.GradeList.Competitors" },
    //to-do - template & provider
    { path: "/region/:regionId/competition/:competitionId/club/:clubId/competitors", component: ClubPage, name : "Region.Competition.ClubList.Competitors" },
])

//app decorator - save some code writing. Wrapper around @Component
@App({
    selector: "main",
    designMode: true,
    providers: [Logger, 
        GradeCache, 
        ClubCache,
        CompetitionCache, 
        RegionCache
    ],
    registerElements: [{
        name: "CardView",
        resolver: () => require("nativescript-cardview").CardView
    },
    {
        name: "PullToRefresh",
        resolver: () => require("nativescript-pulltorefresh").PullToRefresh 
    }],
    directives: []
})
export class AppMain {
    constructor(private logger:Logger)
    {
        this.logger.Notify("Main Page Starting");
    }
}