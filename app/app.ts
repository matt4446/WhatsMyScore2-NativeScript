import 'reflect-metadata';

import {Router} from "angular2/router";
import {nativeScriptBootstrap} from 'nativescript-angular/application';
import {bind, provide, Inject, Component} from 'angular2/core';
import {Page} from "./decorators/page";
import {App} from "./decorators/app";
import {HTTP_PROVIDERS} from 'angular2/http';
import {NSLocationStrategy} from    "./ns-location-strategy";
//routing
import {APP_BASE_HREF, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, LocationStrategy} from "angular2/router";

import {AppMain } from "./app-main";

nativeScriptBootstrap(AppMain, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    bind(LocationStrategy).toClass(NSLocationStrategy),
    provide(APP_BASE_HREF, {useValue : '/'})
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
