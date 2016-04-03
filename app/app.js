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
var app_1 = require("./decorators/app");
//pages 
var startPage_1 = require("./pages/startPage/startPage");
var regionsPage_1 = require("./pages/regionsPage/regionsPage");
var regionPage_1 = require("./pages/regionPage/regionPage");
var regionCompetitionPage_1 = require("./pages/regionCompetitionPage/regionCompetitionPage");
//providers 
var logger_1 = require("./providers/logger");
var router_1 = require("angular2/router");
// ---- ADD THIS LINE ----
require('nativescript-liveedit');
// -----------------------
//app decorator - save some code writing. Wrapper around @Component
var AppMain = (function () {
    function AppMain(logger) {
        this.logger = logger;
        this.logger.Notify("Main Page Starting");
    }
    AppMain = __decorate([
        app_1.App({
            selector: "main",
            providers: [logger_1.Logger],
            registerElements: [{
                    name: "CardView",
                    resolver: function () { return require("nativescript-cardview").CardView; }
                }],
            directives: []
        }),
        router_1.RouteConfig([
            { path: "/", component: startPage_1.StartPage, name: "Start" },
            { path: "/regions", component: regionsPage_1.RegionsPage, name: "Regions" },
            { path: "/regions/:regionId", component: regionPage_1.RegionPage, name: "Region" },
            { path: "/regions/:regionId/competition/:competitionId", component: regionCompetitionPage_1.RegionCompetitionPage, name: "Region.Competition" }
        ]), 
        __metadata('design:paramtypes', [logger_1.Logger])
    ], AppMain);
    return AppMain;
})();
exports.AppMain = AppMain;
//# sourceMappingURL=app.js.map