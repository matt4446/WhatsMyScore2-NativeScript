require('reflect-metadata');
var application_1 = require('nativescript-angular/application');
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var ns_location_strategy_1 = require("./ns-location-strategy");
//routing
var router_1 = require("angular2/router");
var app_main_1 = require("./app-main");
application_1.nativeScriptBootstrap(app_main_1.AppMain, [
    http_1.HTTP_PROVIDERS,
    router_1.ROUTER_PROVIDERS,
    core_1.bind(router_1.LocationStrategy).toClass(ns_location_strategy_1.NSLocationStrategy),
    core_1.provide(router_1.APP_BASE_HREF, { useValue: '/' })
]);
// var bootstrapPromise; 
// 
// export function pageLoadedBindAngular(args) {
//     var page = args.object;
//     page.bindingContext = "";
// 
//     if(!bootstrapPromise){
//         console.log('BOOTSTRAPPING...');
//         var promise = bootstrap(AppMain, [
//         //var promise = nativeScriptBootstrap(AppMain, [
//             ROUTER_PROVIDERS,
//             bind(LocationStrategy).toClass(NSLocationStrategy), //https://github.com/NativeScript/sample-Groceries/blob/710de30fdfe8640cabb489fb64ac02c1af894926/app/app-page.ts
//             provide(APP_BASE_HREF, {useValue : '/'})
//         ]);
//     }
//     
//     bootstrapPromise = promise
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQU8sa0JBQWtCLENBQUMsQ0FBQTtBQUcxQiw0QkFBb0Msa0NBQWtDLENBQUMsQ0FBQTtBQUN2RSxxQkFBK0MsZUFBZSxDQUFDLENBQUE7QUFHL0QscUJBQTZCLGVBQWUsQ0FBQyxDQUFBO0FBQzdDLHFDQUFvQyx3QkFBd0IsQ0FBQyxDQUFBO0FBQzdELFNBQVM7QUFDVCx1QkFBZ0csaUJBQWlCLENBQUMsQ0FBQTtBQUVsSCx5QkFBdUIsWUFBWSxDQUFDLENBQUE7QUFFcEMsbUNBQXFCLENBQUMsa0JBQU8sRUFBRTtJQUMzQixxQkFBYztJQUNkLHlCQUFnQjtJQUNoQixXQUFJLENBQUMseUJBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMseUNBQWtCLENBQUM7SUFDbEQsY0FBTyxDQUFDLHNCQUFhLEVBQUUsRUFBQyxRQUFRLEVBQUcsR0FBRyxFQUFDLENBQUM7Q0FDM0MsQ0FBQyxDQUFDO0FBQ0gseUJBQXlCO0FBQ3pCLEdBQUc7QUFDSCxnREFBZ0Q7QUFDaEQsOEJBQThCO0FBQzlCLGdDQUFnQztBQUNoQyxHQUFHO0FBQ0gsNkJBQTZCO0FBQzdCLDJDQUEyQztBQUMzQyw2Q0FBNkM7QUFDN0MsMkRBQTJEO0FBQzNELGdDQUFnQztBQUNoQyxtTEFBbUw7QUFDbkwsdURBQXVEO0FBQ3ZELGNBQWM7QUFDZCxRQUFRO0FBQ1IsT0FBTztBQUNQLGlDQUFpQztBQUNqQyxJQUFJIn0=