var application_1 = require("nativescript-angular/application");
var core_1 = require('angular2/core');
var router_1 = require("angular2/router");
var app_main_1 = require("./app-main");
var ns_router_1 = require("./temp/router/ns-router");
var http_1 = require("angular2/http");
//import {NS_ROUTER_PROVIDERS} from "nativescript-angular/router/ns-router";
application_1.nativeScriptBootstrap(app_main_1.AppMain, [http_1.HTTP_PROVIDERS, ns_router_1.NS_ROUTER_PROVIDERS, core_1.provide(router_1.APP_BASE_HREF, { useValue: '/' })]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDRCQUFvQyxrQ0FBa0MsQ0FBQyxDQUFBO0FBQ3ZFLHFCQUErQyxlQUFlLENBQUMsQ0FBQTtBQUMvRCx1QkFBNEIsaUJBQWlCLENBQUMsQ0FBQTtBQUU5Qyx5QkFBdUIsWUFBWSxDQUFDLENBQUE7QUFDcEMsMEJBQXlELHlCQUF5QixDQUFDLENBQUE7QUFDbkYscUJBQTZCLGVBQWUsQ0FBQyxDQUFBO0FBQzdDLDRFQUE0RTtBQUU1RSxtQ0FBcUIsQ0FBQyxrQkFBTyxFQUFFLENBQUMscUJBQWMsRUFBRSwrQkFBbUIsRUFBRSxjQUFPLENBQUMsc0JBQWEsRUFBRSxFQUFDLFFBQVEsRUFBRyxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyJ9