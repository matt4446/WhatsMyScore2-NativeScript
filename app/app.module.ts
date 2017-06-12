import * as AppRoutes from "./app.routing";
import * as Controls from "./controls/controls.ref";
import * as Nav from "./pages/menus.ref";
import * as Pages from "./pages/pages.ref";
import * as Pipes from "./pipes/pipes.ref";
import * as Providers from "./providers/providers.ref";
import * as Templates from "./pages/templates.ref";

import { NO_ERRORS_SCHEMA, NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { MomentModule } from "angular2-moment";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptUISideDrawerModule } from "nativescript-telerik-ui/sidedrawer/angular";
import { NgPipesModule } from "ngx-pipes";

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(AppRoutes.appRoutes),
        NativeScriptUISideDrawerModule,
        NgPipesModule,
        MomentModule
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

        Templates.CompetitorResult,
        Templates.CompetitorResultRow,
        Templates.CompetitorResultRowHeader,
        Templates.ResultsDetailRow,

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
        Controls.NxIcon,
        Controls.NxNav,
        Controls.NxNavRow,
        Controls.NxNavBack,
        Controls.NxPullToRefresh,
        Controls.NxPullToRefreshView,
        Controls.NxPullToRefreshAnimateElement,

        Controls.NxTitle,
        Controls.Paralax,
        Controls.ParallaxCollapsableItem,
        Controls.ParallaxExpandableItem,

        Pipes.DisplayDate,
        Pipes.FormScoreFormatter,
        // Pipes.OrderByPipe,
        // Pipes.GroupByPipe,
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
        Providers.CompetitionService,
        Providers.CompetitorService,
        Providers.AppRoutingService
        // {
        //     provide: Providers.AppRoutingService,
        //     useFactory: Providers.AppRoutingServiceFactory,
        //     deps: [PageRoute]
        // }
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
    constructor(private logger:Providers.Logger) {
        this.logger.Notify("Main Page Starting");
    }
}

