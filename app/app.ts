import 'reflect-metadata';
//docorators
import {App} from "./decorators/app";
//pages 
import { StartPage } from "./pages/start/startPage";
import { RegionsPage } from "./pages/regions/regionsPage";
import { RegionPage } from "./pages/region/regionPage";
import { RegionCompetitionPage } from "./pages/regionCompetition/RegionCompetition.Page";
import { ClubListPage } from "./pages/competition/clubList/page";
import { FindCompetitorPage } from "./pages/competition/findCompetitor/page";
import { GradeListPage } from "./pages/competition/gradeList/page";
import { InformationPage } from "./pages/competition/information/page";
import { StartListPage } from "./pages/competition/startList/page";
import { StatsPage } from "./pages/competition/stats/page"

//providers 
import {Logger} from "./providers/logger";
import {RouteConfig} from "angular2/router";

//app decorator - save some code writing. Wrapper around @Component
@App({
    selector: "main",
    providers: [Logger],
    registerElements: [{
        name: "CardView",
        resolver: () => require("nativescript-cardview").CardView
    }],
    directives: []
})
@RouteConfig([
    { path: "/", component: StartPage, name: "Start" },
    { path: "/regions", component: RegionsPage, name: "Regions" },
    { path: "/regions/:regionId", component: RegionPage, name: "Region" },
    /* competition picked - new navigation level */
    { path: "/regions/:regionId/competition/:competitionId", component: RegionCompetitionPage, name: "Region.Competition" },
    //to-do - template & provider
    { path: "/regions/:regionId/competition/:competitionId/information", component: InformationPage, name: "Region.Competition.Information" },
    //to-do - template & provider
    { path: "/regions/:regionId/competition/:competitionId/startList", component: StartListPage, name : "Region.Competition.StartList"},
    //to-do - template & provider
    { path: "/regions/:regionId/competition/:competitionId/clubList", component: ClubListPage, name: "Region.Competition.ClubList"},
    //to-do - template & provider
    { path: "/regions/:regionId/competition/:competitionId/gradeList", component: GradeListPage, name : "Region.Competition.GradeList" },
    //to-do - template & provider
    { path: "/regions/:regionId/competition/:competitionId/findCompetitor", component: FindCompetitorPage, name: "Region.Competition.FindCompetitor"},
    //to-do - template & provider
    { path: "/regions/:regionId/competition/:competitionId/stats", component: StatsPage, name: "Region.Competition.Stats"},
])
export class AppMain {
    constructor(private logger:Logger)
    {
        this.logger.Notify("Main Page Starting");
    }
}