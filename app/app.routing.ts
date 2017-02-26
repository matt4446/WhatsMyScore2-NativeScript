import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
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

export const appRoutes: Routes = [
    { path: "", component: StartPage },
    { path: "regions", component: RegionsPage },
    { path: "region/:regionId", component: RegionPage },
    { path: "region/:regionId/competition/:competitionId/information", component: InformationPage },
    { path: "region/:regionId/competition/:competitionId/startList", component: StartListPage },
    { path: "region/:regionId/competition/:competitionId/clubList", component: ClubListPage },
    { path: "region/:regionId/competition/:competitionId/gradeList", component: GradeListPage },
    //to-do - template & provider
    { path: "region/:regionId/competition/:competitionId/findCompetitor", component: FindCompetitorPage },
    //to-do - template & provider
    { path: "region/:regionId/competition/:competitionId/stats", component: StatsPage },

    { path: "region/:regionId/competition/:competitionId/startList/:gradeId/competitors", component: StartListGradePage },
    //to-do - template & provider
    { path: "region/:regionId/competition/:competitionId/grade/:gradeId/competitors", component: GradeCompetitorsPage },
    //to-do - template & provider
    { path: "region/:regionId/competition/:competitionId/club/:clubId/competitors", component: ClubPage },
];
