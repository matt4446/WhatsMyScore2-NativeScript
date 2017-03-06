import * as Pages from "./pages/pages.ref";

import { RouterModule, Routes } from "@angular/router";

export const appRoutes: Routes = [
    { path: "", component: Pages.StartPage },
    { path: "regions", component: Pages.RegionsPage },
    { path: "regions/:regionId", component: Pages.RegionPage },
    { path: "regions/:regionId/competition/:competitionId", component: Pages.CompetitionPage },
    { path: "regions/:regionId/competition/:competitionId/information", component: Pages.InformationPage },
    { path: "regions/:regionId/competition/:competitionId/startList", component: Pages.StartListPage },
    { path: "regions/:regionId/competition/:competitionId/clubList", component: Pages.ClubListPage },
    { path: "regions/:regionId/competition/:competitionId/gradeList", component: Pages.GradeListPage },
    //to-do - template & provider
    { path: "regions/:regionId/competition/:competitionId/findCompetitor", component: Pages.FindCompetitorPage },
    //to-do - template & provider
    { path: "regions/:regionId/competition/:competitionId/stats", component: Pages.StatsPage },

    { path: "regions/:regionId/competition/:competitionId/startList/:gradeId/competitors", component: Pages.StartListGradePage },
    //to-do - template & provider
    { path: "regions/:regionId/competition/:competitionId/grade/:gradeId/competitors", component: Pages.GradeCompetitorsPage },
    //to-do - template & provider
    { path: "regions/:regionId/competition/:competitionId/club/:clubId/competitors", component: Pages.ClubPage },
];
