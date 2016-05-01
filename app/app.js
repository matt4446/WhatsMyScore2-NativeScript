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
//docorators
var app_1 = require("./decorators/app");
//pages 
//level 1 
var page_1 = require("./pages/competition/stats/page");
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
var router_1 = require("angular2/router");
//level 1 
var AppMain = (function () {
    function AppMain(logger) {
        this.logger = logger;
        this.logger.Notify("Main Page Starting");
    }
    AppMain = __decorate([
        router_1.RouteConfig([
            { path: "/", component: start_page_1.StartPage, name: "Start" },
            { path: "/test", component: test_page_1.TestPage, name: "Test" },
            { path: "/test2", component: parallax_page_1.ParallaxTestPage, name: "ParallaxTestPage" },
            { path: "/regions", component: regions_page_1.RegionsPage, name: "Regions" },
            { path: "/region/:regionId", component: region_page_1.RegionPage, name: "Region" }
        ]),
        router_1.RouteConfig([
            { path: "/region/:regionId/competition/:competitionId", component: competition_page_1.CompetitionPage, name: "Region.Competition" },
        ]),
        router_1.RouteConfig([
            //to-do - template & provider
            { path: "/region/:regionId/competition/:competitionId/information", component: information_page_1.InformationPage, name: "Region.Competition.Information" },
            { path: "/region/:regionId/competition/:competitionId/startList", component: start_list_page_1.StartListPage, name: "Region.Competition.StartList" },
            { path: "/region/:regionId/competition/:competitionId/clubList", component: club_list_page_1.ClubListPage, name: "Region.Competition.ClubList" },
            { path: "/region/:regionId/competition/:competitionId/gradeList", component: grade_list_page_1.GradeListPage, name: "Region.Competition.GradeList" },
            //to-do - template & provider
            { path: "/region/:regionId/competition/:competitionId/findCompetitor", component: find_competitor_page_1.FindCompetitorPage, name: "Region.Competition.FindCompetitor" },
            //to-do - template & provider
            { path: "/region/:regionId/competition/:competitionId/stats", component: page_1.StatsPage, name: "Region.Competition.Stats" },
        ]),
        router_1.RouteConfig([]),
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
})();
exports.AppMain = AppMain;
//# sourceMappingURL=app.js.map