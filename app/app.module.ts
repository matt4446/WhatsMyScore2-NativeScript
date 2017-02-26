
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AppComponent } from './app.component';

import * as AppRoutes from "./app.routing";
import * as Pages from "./pages/pages.ref";
import * as Controls from "./controls/controls.ref";
import * as Pipes from "./pipes/pipes.ref";

//providers 
import {Logger} from "./providers/logger";
import {RegionCache, CompetitionCache, GradeCache, ClubCache} from "./providers/leagues/cache";

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        Pages.StartPage,
        Pages.StartListControl,
        Pages.StartListSearchControl,

        Pages.InformationPage,
        Pages.RegionsPage,
        Pages.RegionPage,
        Pages.FindCompetitorPage,
         
        Pages.CompetitionPage,
        Pages.StartListPage,
        Pages.StartListGradePage,
        Pages.ClubListPage,
        Pages.ClubPage,
        Pages.GradeListPage,
        Pages.GradeCompetitorsPage,
        Pages.StatsPage, 


        Controls.AlignLeft, Controls.AlignRight,
        Controls.IonIcon,
        Controls.MaterialFab,
        Controls.MaterialIcon,
        Controls.NavIcon,
        Controls.NxCard,
        Controls.NxContent,
        Controls.NxDrawer,
        Controls.NxFakeFab,
        Controls.NxHeader,
        Controls.NxList,
        Controls.NxListItem,
        Controls.NxNav,
        Controls.NxNavBack,
        Controls.NxPullToRefresh,
        Controls.NxTitle,
        Controls.Paralax,
        Controls.ParallaxCollapsableItem,
        Controls.ParallaxExpandableItem,
        Controls.PullToRefreshAnimateElement,

        Pipes.DisplayDate,
        Pipes.FormScoreFormatter,
        Pipes.OrderByPipe,
        Pipes.GroupByPipe,
        Pipes.ScoreFormatter,
        Pipes.TitleTransform
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule, 
        NativeScriptRouterModule,

        NativeScriptRouterModule.forRoot(AppRoutes.appRoutes),
    ],
    providers: [
        Logger, 
        GradeCache, 
        ClubCache,
        CompetitionCache, 
        RegionCache
    ],
    schemas: [NO_ERRORS_SCHEMA],
    // selector: "main",
    // designMode: true,
    // providers: [Logger, 
    //     GradeCache, 
    //     ClubCache,
    //     CompetitionCache, 
    //     RegionCache
    // ],
    // registerElements: [{
    //     name: "CardView",
    //     resolver: () => require("nativescript-cardview").CardView
    // },
    // {
    //     name: "PullToRefresh",
    //     resolver: () => require("nativescript-pulltorefresh").PullToRefresh 
    // },{
    //     name: "VideoPlayer",
    //     resolver: () => require("nativescript-videoplayer").Video
    // }],
    // directives: []
})
export class AppModule {
    constructor(private logger:Logger)
    {
        this.logger.Notify("Main Page Starting");
    }
}

