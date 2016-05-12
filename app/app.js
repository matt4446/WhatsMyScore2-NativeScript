"use strict";
require('reflect-metadata');
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/zip';
// import 'rxjs/add/operator/from';
// import 'rxjs/add/operator/toArray';
var router_deprecated_1 = require("@angular/router-deprecated");
//decorators
var app_1 = require("./decorators/app");
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
        router_deprecated_1.RouteConfig([]),
        app_1.App({
            selector: "main",
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
                }],
            directives: []
        }), 
        __metadata('design:paramtypes', [logger_1.Logger])
    ], AppMain);
    return AppMain;
}());
exports.AppMain = AppMain;
//# sourceMappingURL=app.js.map