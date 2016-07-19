"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require('reflect-metadata');
//decorators
var app_1 = require("./decorators/app");
var router_deprecated_1 = require("@angular/router-deprecated");
//pages 
//level 1 
var stats_page_1 = require("./pages/competition/stats/stats.page");
var test_page_1 = require("./pages/test/test.page");
var parallax_page_1 = require("./pages/test/parallax.page");
var start_page_1 = require("./pages/start/start.page");
var regions_page_1 = require("./pages/regions/regions.page");
var region_page_1 = require("./pages/region/region.page");
//level 2
var competition_page_1 = require("./pages/competition/competition.page");
//level 3
var club_list_page_1 = require("./pages/competition/clubList/club.list.page");
var find_competitor_page_1 = require("./pages/competition/findCompetitor/find.competitor.page");
var grade_list_page_1 = require("./pages/competition/gradeList/grade.list.page");
var information_page_1 = require("./pages/competition/information/information.page");
var start_list_page_1 = require("./pages/competition/startList/start.list.page");
//level 4
var competitors_page_1 = require("./pages/competition/startList/competitors/competitors.page");
var club_page_1 = require("./pages/competition/club/club.page");
var grade_page_1 = require("./pages/competition/grade/grade.page");
//providers 
var logger_1 = require("./providers/logger");
var cache_1 = require("./providers/leagues/cache");
//level 1 
var AppMain = (function () {
    function AppMain(logger) {
        this.logger = logger;
        this.logger.Notify("Main Page Starting");
    }
    AppMain = __decorate([
        router_deprecated_1.RouteConfig([
            { path: "/", component: start_page_1.StartPage, name: "Start" },
            { path: "/test", component: test_page_1.TestPage, name: "Test" },
            { path: "/test2", component: parallax_page_1.ParallaxTestPage, name: "ParallaxTestPage" },
            { path: "/regions", component: regions_page_1.RegionsPage, name: "Regions" },
            { path: "/region/:regionId", component: region_page_1.RegionPage, name: "Region" }
        ]),
        router_deprecated_1.RouteConfig([
            { path: "/region/:regionId/competition/:competitionId", component: competition_page_1.CompetitionPage, name: "Region.Competition" },
        ]),
        router_deprecated_1.RouteConfig([
            //to-do - template & provider
            { path: "/region/:regionId/competition/:competitionId/information", component: information_page_1.InformationPage, name: "Region.Competition.Information" },
            { path: "/region/:regionId/competition/:competitionId/startList", component: start_list_page_1.StartListPage, name: "Region.Competition.StartList" },
            { path: "/region/:regionId/competition/:competitionId/clubList", component: club_list_page_1.ClubListPage, name: "Region.Competition.ClubList" },
            { path: "/region/:regionId/competition/:competitionId/gradeList", component: grade_list_page_1.GradeListPage, name: "Region.Competition.GradeList" },
            //to-do - template & provider
            { path: "/region/:regionId/competition/:competitionId/findCompetitor", component: find_competitor_page_1.FindCompetitorPage, name: "Region.Competition.FindCompetitor" },
            //to-do - template & provider
            { path: "/region/:regionId/competition/:competitionId/stats", component: stats_page_1.StatsPage, name: "Region.Competition.Stats" },
        ]),
        router_deprecated_1.RouteConfig([
            //to-do - template & provider
            { path: "/region/:regionId/competition/:competitionId/startList/:gradeId/competitors", component: competitors_page_1.StartListGradePage, name: "Region.Competition.StartList.Competitors" },
            //to-do - template & provider
            { path: "/region/:regionId/competition/:competitionId/grade/:gradeId/competitors", component: grade_page_1.GradeCompetitorsPage, name: "Region.Competition.GradeList.Competitors" },
            //to-do - template & provider
            { path: "/region/:regionId/competition/:competitionId/club/:clubId/competitors", component: club_page_1.ClubPage, name: "Region.Competition.ClubList.Competitors" },
        ]),
        app_1.App({
            selector: "main",
            designMode: true,
            providers: [logger_1.Logger,
                cache_1.GradeCache,
                cache_1.ClubCache,
                cache_1.CompetitionCache,
                cache_1.RegionCache
            ],
            registerElements: [{
                    name: "CardView",
                    resolver: function () { return require("nativescript-cardview").CardView; }
                },
                {
                    name: "PullToRefresh",
                    resolver: function () { return require("nativescript-pulltorefresh").PullToRefresh; }
                }, {
                    name: "VideoPlayer",
                    resolver: function () { return require("nativescript-videoplayer").Video; }
                }],
            directives: []
        }), 
        __metadata('design:paramtypes', [logger_1.Logger])
    ], AppMain);
    return AppMain;
}());
exports.AppMain = AppMain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxRQUFPLGtCQUFrQixDQUFDLENBQUE7QUFFMUIsWUFBWTtBQUNaLG9CQUFrQixrQkFBa0IsQ0FBQyxDQUFBO0FBQ3JDLGtDQUEwQiw0QkFBNEIsQ0FBQyxDQUFBO0FBQ3ZELFFBQVE7QUFDUixVQUFVO0FBQ1YsMkJBQTBCLHNDQUFzQyxDQUFDLENBQUE7QUFDakUsMEJBQXlCLHdCQUF3QixDQUFDLENBQUE7QUFDbEQsOEJBQWlDLDRCQUE0QixDQUFDLENBQUE7QUFDOUQsMkJBQTBCLDBCQUEwQixDQUFDLENBQUE7QUFDckQsNkJBQTRCLDhCQUE4QixDQUFDLENBQUE7QUFDM0QsNEJBQTJCLDRCQUE0QixDQUFDLENBQUE7QUFDeEQsU0FBUztBQUNULGlDQUFnQyxzQ0FBc0MsQ0FBQyxDQUFBO0FBRXZFLFNBQVM7QUFDVCwrQkFBNkIsNkNBQTZDLENBQUMsQ0FBQTtBQUMzRSxxQ0FBbUMseURBQXlELENBQUMsQ0FBQTtBQUM3RixnQ0FBOEIsK0NBQStDLENBQUMsQ0FBQTtBQUM5RSxpQ0FBZ0Msa0RBQWtELENBQUMsQ0FBQTtBQUNuRixnQ0FBOEIsK0NBQStDLENBQUMsQ0FBQTtBQUU5RSxTQUFTO0FBQ1QsaUNBQWtDLDREQUE0RCxDQUFDLENBQUE7QUFDL0YsMEJBQXVCLG9DQUFvQyxDQUFDLENBQUE7QUFDNUQsMkJBQW1DLHNDQUFzQyxDQUFDLENBQUE7QUFHMUUsWUFBWTtBQUNaLHVCQUFxQixvQkFBb0IsQ0FBQyxDQUFBO0FBQzFDLHNCQUFtRSwyQkFBMkIsQ0FBQyxDQUFBO0FBSS9GLFVBQVU7QUFpRlY7SUFDSSxpQkFBb0IsTUFBYTtRQUFiLFdBQU0sR0FBTixNQUFNLENBQU87UUFFN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBcEZMO1FBQUMsK0JBQVcsQ0FBQztZQUNULEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsc0JBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO1lBQ2xELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUcsb0JBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1lBQ3JELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUcsZ0NBQWdCLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFO1lBQzFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsMEJBQVcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQzdELEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBRSx3QkFBVSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7U0FDdkUsQ0FBQztRQVNELCtCQUFXLENBQUM7WUFDVCxFQUFFLElBQUksRUFBRSw4Q0FBOEMsRUFBRSxTQUFTLEVBQUUsa0NBQWUsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUU7U0FDbkgsQ0FBQztRQVFELCtCQUFXLENBQUM7WUFDVCw2QkFBNkI7WUFDN0IsRUFBRSxJQUFJLEVBQUUsMERBQTBELEVBQUUsU0FBUyxFQUFFLGtDQUFlLEVBQUUsSUFBSSxFQUFFLGdDQUFnQyxFQUFFO1lBRXhJLEVBQUUsSUFBSSxFQUFFLHdEQUF3RCxFQUFFLFNBQVMsRUFBRSwrQkFBYSxFQUFFLElBQUksRUFBRyw4QkFBOEIsRUFBQztZQUVsSSxFQUFFLElBQUksRUFBRSx1REFBdUQsRUFBRSxTQUFTLEVBQUUsNkJBQVksRUFBRSxJQUFJLEVBQUUsNkJBQTZCLEVBQUM7WUFFOUgsRUFBRSxJQUFJLEVBQUUsd0RBQXdELEVBQUUsU0FBUyxFQUFFLCtCQUFhLEVBQUUsSUFBSSxFQUFHLDhCQUE4QixFQUFFO1lBQ25JLDZCQUE2QjtZQUM3QixFQUFFLElBQUksRUFBRSw2REFBNkQsRUFBRSxTQUFTLEVBQUUseUNBQWtCLEVBQUUsSUFBSSxFQUFFLG1DQUFtQyxFQUFDO1lBQ2hKLDZCQUE2QjtZQUM3QixFQUFFLElBQUksRUFBRSxvREFBb0QsRUFBRSxTQUFTLEVBQUUsc0JBQVMsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUM7U0FDeEgsQ0FBQztRQVVELCtCQUFXLENBQUM7WUFDVCw2QkFBNkI7WUFDN0IsRUFBRSxJQUFJLEVBQUUsNkVBQTZFLEVBQUUsU0FBUyxFQUFFLHFDQUFrQixFQUFFLElBQUksRUFBRSwwQ0FBMEMsRUFBQztZQUN2Syw2QkFBNkI7WUFDN0IsRUFBRSxJQUFJLEVBQUUseUVBQXlFLEVBQUUsU0FBUyxFQUFFLGlDQUFvQixFQUFFLElBQUksRUFBRywwQ0FBMEMsRUFBRTtZQUN2Syw2QkFBNkI7WUFDN0IsRUFBRSxJQUFJLEVBQUUsdUVBQXVFLEVBQUUsU0FBUyxFQUFFLG9CQUFRLEVBQUUsSUFBSSxFQUFHLHlDQUF5QyxFQUFFO1NBQzNKLENBQUM7UUFHRCxTQUFHLENBQUM7WUFDRCxRQUFRLEVBQUUsTUFBTTtZQUNoQixVQUFVLEVBQUUsSUFBSTtZQUNoQixTQUFTLEVBQUUsQ0FBQyxlQUFNO2dCQUNkLGtCQUFVO2dCQUNWLGlCQUFTO2dCQUNULHdCQUFnQjtnQkFDaEIsbUJBQVc7YUFDZDtZQUNELGdCQUFnQixFQUFFLENBQUM7b0JBQ2YsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLFFBQVEsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsUUFBUSxFQUF6QyxDQUF5QztpQkFDNUQ7Z0JBQ0Q7b0JBQ0ksSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFFBQVEsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsYUFBYSxFQUFuRCxDQUFtRDtpQkFDdEUsRUFBQztvQkFDRSxJQUFJLEVBQUUsYUFBYTtvQkFDbkIsUUFBUSxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxLQUFLLEVBQXpDLENBQXlDO2lCQUM1RCxDQUFDO1lBQ0YsVUFBVSxFQUFFLEVBQUU7U0FDakIsQ0FBQzs7ZUFBQTtJQU1GLGNBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQztBQUxZLGVBQU8sVUFLbkIsQ0FBQSJ9