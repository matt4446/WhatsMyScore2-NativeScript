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
var app_1 = require("./decorators/app");
//pages 
var startPage_1 = require("./pages/startPage/startPage");
var regionsPage_1 = require("./pages/regionsPage/regionsPage");
var regionPage_1 = require("./pages/regionPage/regionPage");
var regionCompetitionPage_1 = require("./pages/regionCompetitionPage/regionCompetitionPage");
//providers 
var logger_1 = require("./providers/logger");
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
}());
exports.AppMain = AppMain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxRQUFPLGtCQUFrQixDQUFDLENBQUE7QUFFMUIsb0JBQWtCLGtCQUFrQixDQUFDLENBQUE7QUFFckMsUUFBUTtBQUNSLDBCQUEwQiw2QkFBNkIsQ0FBQyxDQUFBO0FBQ3hELDRCQUE0QixpQ0FBaUMsQ0FBQyxDQUFBO0FBQzlELDJCQUEyQiwrQkFBK0IsQ0FBQyxDQUFBO0FBQzNELHNDQUFzQyxxREFBcUQsQ0FBQyxDQUFBO0FBQzVGLFlBQVk7QUFDWix1QkFBcUIsb0JBQW9CLENBQUMsQ0FBQTtBQVUxQyx1QkFBMEIsaUJBQWlCLENBQUMsQ0FBQTtBQUc1QyxtRUFBbUU7QUFpQm5FO0lBQ0ksaUJBQW9CLE1BQWE7UUFBYixXQUFNLEdBQU4sTUFBTSxDQUFPO1FBRTdCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDN0MsQ0FBQztJQXBCTDtRQUFDLFNBQUcsQ0FBQztZQUNELFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFNBQVMsRUFBRSxDQUFDLGVBQU0sQ0FBQztZQUNuQixnQkFBZ0IsRUFBRSxDQUFDO29CQUNmLElBQUksRUFBRSxVQUFVO29CQUNoQixRQUFRLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFFBQVEsRUFBekMsQ0FBeUM7aUJBQzVELENBQUM7WUFDRixVQUFVLEVBQUUsRUFBRTtTQUNqQixDQUFDO1FBRUQsb0JBQVcsQ0FBQztZQUNULEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUscUJBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO1lBQ2xELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUseUJBQVcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQzdELEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSx1QkFBVSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDckUsRUFBRSxJQUFJLEVBQUUsK0NBQStDLEVBQUUsU0FBUyxFQUFFLDZDQUFxQixFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRTtTQUMxSCxDQUFDOztlQUFBO0lBTUYsY0FBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBTFksZUFBTyxVQUtuQixDQUFBIn0=