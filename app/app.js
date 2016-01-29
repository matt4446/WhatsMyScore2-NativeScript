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
var application_1 = require('nativescript-angular/application');
var core_1 = require('angular2/core');
var app_1 = require("./decorators/app");
//pages 
var startPage_1 = require("./pages/startPage/startPage");
var regionsPage_1 = require("./pages/regionsPage/regionsPage");
var regionPage_1 = require("./pages/regionPage/regionPage");
//providers 
var logger_1 = require("./providers/logger");
var ns_location_strategy_1 = require("./ns-location-strategy");
var http_1 = require('angular2/http');
//routing
var router_1 = require("angular2/router");
var list_1 = require("./controls/list/list");
var list_item_1 = require("./controls/list/list-item");
var header_1 = require("./controls/list/header");
var ion_icon_1 = require("./controls/icons/ion-icon");
//page decorator - save some code writing. Wrapper around @Component
var AppMain = (function () {
    function AppMain(logger) {
        this.logger = logger;
        this.logger.Notify("Main Page Starting");
    }
    AppMain = __decorate([
        app_1.App({
            selector: "main",
            providers: [logger_1.Logger, http_1.HTTP_PROVIDERS],
            directives: [list_1.NxList, list_item_1.NxListItem, header_1.NxHeader, ion_icon_1.IonIcon]
        }),
        router_1.RouteConfig([
            { path: "/", component: startPage_1.StartPage, as: "Start" },
            { path: "/regions", component: regionsPage_1.RegionsPage, as: "Regions" },
            { path: "/regions/:id", component: regionPage_1.RegionPage, as: "Region" }
        ]), 
        __metadata('design:paramtypes', [logger_1.Logger])
    ], AppMain);
    return AppMain;
})();
exports.AppMain = AppMain;
var bootstrapPromise;
function pageLoadedBindAngular(args) {
    var page = args.object;
    page.bindingContext = "";
    if (!bootstrapPromise) {
        console.log('BOOTSTRAPPING...');
        var promise = application_1.nativeScriptBootstrap(AppMain, [
            router_1.ROUTER_PROVIDERS,
            core_1.bind(router_1.LocationStrategy).toClass(ns_location_strategy_1.NSLocationStrategy),
            core_1.provide(router_1.APP_BASE_HREF, { useValue: '/' })
        ]);
    }
    bootstrapPromise = promise;
}
exports.pageLoadedBindAngular = pageLoadedBindAngular;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbIkFwcE1haW4iLCJBcHBNYWluLmNvbnN0cnVjdG9yIiwicGFnZUxvYWRlZEJpbmRBbmd1bGFyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxRQUFPLGtCQUFrQixDQUFDLENBQUE7QUFHMUIsNEJBQW9DLGtDQUFrQyxDQUFDLENBQUE7QUFDdkUscUJBQStDLGVBQWUsQ0FBQyxDQUFBO0FBRS9ELG9CQUFrQixrQkFBa0IsQ0FBQyxDQUFBO0FBRXJDLFFBQVE7QUFDUiwwQkFBMEIsNkJBQTZCLENBQUMsQ0FBQTtBQUN4RCw0QkFBNEIsaUNBQWlDLENBQUMsQ0FBQTtBQUM5RCwyQkFBMkIsK0JBQStCLENBQUMsQ0FBQTtBQUUzRCxZQUFZO0FBQ1osdUJBQW9DLG9CQUFvQixDQUFDLENBQUE7QUFDekQscUNBQW9DLHdCQUF3QixDQUFDLENBQUE7QUFDN0QscUJBQW9DLGVBQWUsQ0FBQyxDQUFBO0FBRXBELFNBQVM7QUFDVCx1QkFBZ0csaUJBQWlCLENBQUMsQ0FBQTtBQUtsSCxxQkFBcUIsc0JBQXNCLENBQUMsQ0FBQTtBQUM1QywwQkFBeUIsMkJBQTJCLENBQUMsQ0FBQTtBQUNyRCx1QkFBdUIsd0JBQXdCLENBQUMsQ0FBQTtBQUNoRCx5QkFBc0IsMkJBQTJCLENBQUMsQ0FBQTtBQUVsRCxvRUFBb0U7QUFDcEU7SUFXSUEsaUJBQW9CQSxNQUFhQTtRQUFiQyxXQUFNQSxHQUFOQSxNQUFNQSxDQUFPQTtRQUU3QkEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxDQUFDQTtJQUM3Q0EsQ0FBQ0E7SUFkTEQ7UUFBQ0EsU0FBR0EsQ0FBQ0E7WUFDREEsUUFBUUEsRUFBRUEsTUFBTUE7WUFDaEJBLFNBQVNBLEVBQUVBLENBQUNBLGVBQU1BLEVBQUVBLHFCQUFjQSxDQUFDQTtZQUNuQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsYUFBTUEsRUFBRUEsc0JBQVVBLEVBQUVBLGlCQUFRQSxFQUFFQSxrQkFBT0EsQ0FBQ0E7U0FDdERBLENBQUNBO1FBQ0RBLG9CQUFXQSxDQUFDQTtZQUNUQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxTQUFTQSxFQUFFQSxxQkFBU0EsRUFBRUEsRUFBRUEsRUFBRUEsT0FBT0EsRUFBRUE7WUFDaERBLEVBQUVBLElBQUlBLEVBQUVBLFVBQVVBLEVBQUVBLFNBQVNBLEVBQUVBLHlCQUFXQSxFQUFFQSxFQUFFQSxFQUFFQSxTQUFTQSxFQUFFQTtZQUMzREEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBY0EsRUFBRUEsU0FBU0EsRUFBRUEsdUJBQVVBLEVBQUVBLEVBQUVBLEVBQUVBLFFBQVFBLEVBQUVBO1NBQ2hFQSxDQUFDQTs7Z0JBTURBO0lBQURBLGNBQUNBO0FBQURBLENBQUNBLEFBZkQsSUFlQztBQUxZLGVBQU8sVUFLbkIsQ0FBQTtBQUVELElBQUksZ0JBQWdCLENBQUM7QUFFckIsK0JBQXNDLElBQUk7SUFDdENFLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO0lBQ3ZCQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxFQUFFQSxDQUFDQTtJQUV6QkEsRUFBRUEsQ0FBQUEsQ0FBQ0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFBQSxDQUFDQTtRQUNsQkEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQTtRQUNoQ0EsSUFBSUEsT0FBT0EsR0FBR0EsbUNBQXFCQSxDQUFDQSxPQUFPQSxFQUFFQTtZQUN6Q0EseUJBQWdCQTtZQUNoQkEsV0FBSUEsQ0FBQ0EseUJBQWdCQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSx5Q0FBa0JBLENBQUNBO1lBQ2xEQSxjQUFPQSxDQUFDQSxzQkFBYUEsRUFBRUEsRUFBQ0EsUUFBUUEsRUFBR0EsR0FBR0EsRUFBQ0EsQ0FBQ0E7U0FDM0NBLENBQUNBLENBQUNBO0lBQ1BBLENBQUNBO0lBRURBLGdCQUFnQkEsR0FBR0EsT0FBT0EsQ0FBQUE7QUFDOUJBLENBQUNBO0FBZGUsNkJBQXFCLHdCQWNwQyxDQUFBIn0=