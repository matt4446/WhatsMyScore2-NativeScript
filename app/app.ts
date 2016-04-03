import 'reflect-metadata';
import {App} from "./decorators/app";
//pages 
import { StartPage } from "./pages/startPage/startPage";
import { RegionsPage } from "./pages/regionsPage/regionsPage";
import { RegionPage } from "./pages/regionPage/regionPage";
import { RegionCompetitionPage } from "./pages/regionCompetitionPage/regionCompetitionPage";
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
    { path: "/regions/:regionId/competition/:competitionId", component: RegionCompetitionPage, name: "Region.Competition" } 
])
export class AppMain {
    constructor(private logger:Logger)
    {
        this.logger.Notify("Main Page Starting");
    }
}