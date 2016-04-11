import 'reflect-metadata';
//docorators
import {App} from "./decorators/app";
//pages 
import { StartPage } from "./pages/start/startPage";
import { RegionsPage } from "./pages/regions/regionsPage";
import { RegionPage } from "./pages/region/regionPage";
import { CompetitionPage } from "./pages/competition/page";
import { ClubListPage } from "./pages/competition/clubList/page";
import { FindCompetitorPage } from "./pages/competition/findCompetitor/page";
import { GradeListPage } from "./pages/competition/gradeList/page";
import { InformationPage } from "./pages/competition/information/page";
import { StartListPage } from "./pages/competition/startList/page";
import { StatsPage } from "./pages/competition/stats/page"
import { TestPage } from "./pages/test/page";
//providers 
import {Logger} from "./providers/logger";
import {ApplicationCache, CompetitionCache, GradeCache, ClubCache} from "./providers/leagues/cache";
import {RouteConfig} from "angular2/router";

//app decorator - save some code writing. Wrapper around @Component
@App({
    selector: "main",
    providers: [Logger, 
        ApplicationCache, 
        CompetitionCache, 
        GradeCache, 
        ClubCache],
    registerElements: [{
        name: "CardView",
        resolver: () => require("nativescript-cardview").CardView
    },
    {
        name: "PullToRefresh",
        resolver: () => require("nativescript-pulltorefresh").PullToRefresh 
    }
    ],
    directives: []
})
@RouteConfig([
    { path: "/", component: StartPage, name: "Start" },
    { path: "/test", component : TestPage, name: "Test" },
    { path: "/regions", component: RegionsPage, name: "Regions" },
    { path: "/region/:regionId", component: RegionPage, name: "Region" }
])
/* 
    region picked - new navigation level 
    child route of Region 
    /regions/1/...
*/
@RouteConfig([
    { path: "/region/:regionId/competition/:competitionId", component: CompetitionPage, name: "Region.Competition" },
])
/* 
    competition for a region is picked - new navigation level
    child route of Region.Competition :  
    /regions/1/competition/1/...
*/
@RouteConfig([
    //to-do - template & provider
    { path: "/region/:regionId/competition/:competitionId/information", component: InformationPage, name: "Region.Competition.Information" },
    //to-do - template & provider
    { path: "/region/:regionId/competition/:competitionId/startList", component: StartListPage, name : "Region.Competition.StartList"},
    //to-do - template & provider
    { path: "/region/:regionId/competition/:competitionId/clubList", component: ClubListPage, name: "Region.Competition.ClubList"},
    //to-do - template & provider
    { path: "/region/:regionId/competition/:competitionId/gradeList", component: GradeListPage, name : "Region.Competition.GradeList" },
    //to-do - template & provider
    { path: "/region/:regionId/competition/:competitionId/findCompetitor", component: FindCompetitorPage, name: "Region.Competition.FindCompetitor"},
    //to-do - template & provider
    { path: "/region/:regionId/competition/:competitionId/stats", component: StatsPage, name: "Region.Competition.Stats"},
])

@RouteConfig([
    { path: "/region/:regionId/competition/:competitionId/grade/:gradeId/competitors", component: GradeListPage, name : "Region.Competition.GradeList.Competitors" },
    { path: "/region/:regionId/competition/:competitionId/club/:clubId/competitors", component: GradeListPage, name : "Region.Competition.GradeList.Competitors" },
    //to-do - template & provider
])
export class AppMain {
    constructor(private logger:Logger)
    {
        this.logger.Notify("Main Page Starting");
    }
}