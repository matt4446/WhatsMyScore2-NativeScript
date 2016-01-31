import 'reflect-metadata';

import {Router} from "angular2/router";
import {nativeScriptBootstrap, bootstrap} from 'nativescript-angular/application';
import {bind, provide, Inject, Component} from 'angular2/core';
import {Page} from "./decorators/page";
import {App} from "./decorators/app";

//pages 
import { StartPage } from "./pages/startPage/startPage";
import { RegionsPage } from "./pages/regionsPage/regionsPage";
import { RegionPage } from "./pages/regionPage/regionPage";

//providers 
import {Logger} from                "./providers/logger";
import {NSLocationStrategy} from    "./ns-location-strategy";
import {HTTP_PROVIDERS} from        'angular2/http';

//routing
import {APP_BASE_HREF, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, LocationStrategy} from "angular2/router";

//nx- control directives 
//some reason you are all not appearing on each page... 
import {NxNav} from "./controls/nav/nav";
import {NxList} from "./controls/list/list";
import {NxListItem} from "./controls/list/list-item";
import {NxHeader} from "./controls/list/header";
import {IonIcon} from "./controls/icons/ion-icon";


//page decorator - save some code writing. Wrapper around @Component
@App({
    selector: "main",
    providers: [Logger, HTTP_PROVIDERS],
    directives: [NxList, NxListItem, NxHeader, IonIcon]
})
@RouteConfig([
    { path: "/", component: StartPage, as: "Start" },
    { path: "/regions", component: RegionsPage, as: "Regions" },
    { path: "/regions/:id", component: RegionPage, as: "Region" }
])
export class AppMain {
    constructor(private logger:Logger)
    {
        this.logger.Notify("Main Page Starting");
    }
}

var bootstrapPromise; 

export function pageLoadedBindAngular(args) {
    var page = args.object;
    page.bindingContext = "";

    if(!bootstrapPromise){
        console.log('BOOTSTRAPPING...');
        var promise = bootstrap(AppMain, [
        //var promise = nativeScriptBootstrap(AppMain, [
            ROUTER_PROVIDERS,
            bind(LocationStrategy).toClass(NSLocationStrategy), //https://github.com/NativeScript/sample-Groceries/blob/710de30fdfe8640cabb489fb64ac02c1af894926/app/app-page.ts
            provide(APP_BASE_HREF, {useValue : '/'})
        ]);
    }
    
    bootstrapPromise = promise
}
