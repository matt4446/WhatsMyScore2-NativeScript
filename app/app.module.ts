import * as AppRoutes from "./app.routing";
import * as Controls from "./controls/controls.ref";
import * as Nav from "./pages/menus.ref";
import * as Pages from "./pages/pages.ref";
import * as Pipes from "./pipes/pipes.ref";
import * as Providers from "./providers/providers.ref";

import { NO_ERRORS_SCHEMA, NgModule } from "@angular/core";

import { AppComponent } from './app.component';
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptUISideDrawerModule } from "nativescript-telerik-ui/sidedrawer/angular";

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule, 
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(AppRoutes.appRoutes),
        NativeScriptUISideDrawerModule
    ],
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

        Nav.StartNav,
        Nav.CompetitionNav,

        Controls.AlignLeft, 
        Controls.AlignRight,
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
    
    providers: [
        Providers.Logger,

        Providers.RegionCache,
        Providers.RegionService,
        Providers.GradeCache,
        Providers.GradeService,
        Providers.ClubCache,
        Providers.ClubService,
        Providers.CompetitionCache,       
        Providers.CompetitorService,
        Providers.AppRoutingService
        // {
        //     provide: Providers.AppRoutingService,
        //     useFactory: Providers.AppRoutingServiceFactory,
        //     deps: [PageRoute]
        // }
        
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
    constructor(private logger:Providers.Logger)
    {
        this.logger.Notify("Main Page Starting");
    }
}

