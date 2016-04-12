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
//docorators
var app_1 = require("./decorators/app");
//pages 
var startPage_1 = require("./pages/start/startPage");
var regionsPage_1 = require("./pages/regions/regionsPage");
var regionPage_1 = require("./pages/region/regionPage");
var page_1 = require("./pages/competition/page");
var page_2 = require("./pages/competition/clubList/page");
var page_3 = require("./pages/competition/findCompetitor/page");
var page_4 = require("./pages/competition/gradeList/page");
var page_5 = require("./pages/competition/information/page");
var page_6 = require("./pages/competition/startList/page");
var page_7 = require("./pages/competition/stats/page");
var page_8 = require("./pages/test/page");
//providers 
var logger_1 = require("./providers/logger");
var cache_1 = require("./providers/leagues/cache");
var router_1 = require("angular2/router");
//app decorator - save some code writing. Wrapper around @Component
var AppMain = (function () {
    function AppMain(logger) {
        this.logger = logger;
        this.logger.Notify("Main Page Starting");
    }
    AppMain = __decorate([
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
        router_1.RouteConfig([
            { path: "/", component: startPage_1.StartPage, name: "Start" },
            { path: "/test", component: page_8.TestPage, name: "Test" },
            { path: "/regions", component: regionsPage_1.RegionsPage, name: "Regions" },
            { path: "/region/:regionId", component: regionPage_1.RegionPage, name: "Region" }
        ]),
        router_1.RouteConfig([
            { path: "/region/:regionId/competition/:competitionId", component: page_1.CompetitionPage, name: "Region.Competition" },
        ]),
        router_1.RouteConfig([
            //to-do - template & provider
            { path: "/region/:regionId/competition/:competitionId/information", component: page_5.InformationPage, name: "Region.Competition.Information" },
            //to-do - template & provider
            { path: "/region/:regionId/competition/:competitionId/startList", component: page_6.StartListPage, name: "Region.Competition.StartList" },
            //to-do - template & provider
            { path: "/region/:regionId/competition/:competitionId/clubList", component: page_2.ClubListPage, name: "Region.Competition.ClubList" },
            //to-do - template & provider
            { path: "/region/:regionId/competition/:competitionId/gradeList", component: page_4.GradeListPage, name: "Region.Competition.GradeList" },
            //to-do - template & provider
            { path: "/region/:regionId/competition/:competitionId/findCompetitor", component: page_3.FindCompetitorPage, name: "Region.Competition.FindCompetitor" },
            //to-do - template & provider
            { path: "/region/:regionId/competition/:competitionId/stats", component: page_7.StatsPage, name: "Region.Competition.Stats" },
        ]),
        router_1.RouteConfig([
            { path: "/region/:regionId/competition/:competitionId/grade/:gradeId/competitors", component: page_4.GradeListPage, name: "Region.Competition.GradeList.Competitors" },
            { path: "/region/:regionId/competition/:competitionId/club/:clubId/competitors", component: page_4.GradeListPage, name: "Region.Competition.GradeList.Competitors" },
        ]), 
        __metadata('design:paramtypes', [logger_1.Logger])
    ], AppMain);
    return AppMain;
}());
exports.AppMain = AppMain;
//# sourceMappingURL=app.js.map