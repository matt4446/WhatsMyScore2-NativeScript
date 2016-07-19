import { nativeScriptBootstrap, onAfterLivesync, onBeforeLivesync,bootstrap, AppOptions } from "nativescript-angular/application";

import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from "@angular/router-deprecated";

import { bind, provide, Inject, Component, ComponentRef } from '@angular/core';
//import { NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS } from "nativescript-angular/router";
import { NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS} from "nativescript-angular/router-deprecated/ns-router-deprecated";
import { NSLocationStrategy } from "nativescript-angular/router/ns-location-strategy";
import { registerElement, ViewClass } from "nativescript-angular/element-registry";

import { HTTP_PROVIDERS, Http, XHRBackend, XHRConnection, ConnectionBackend, RequestOptions, RequestOptionsArgs, ResponseOptions, ResponseType, Response, Request, BrowserXhr, XSRFStrategy} from '@angular/http';
import { NSXSRFStrategy, NSHttp} from "nativescript-angular/http/ns-http";
import { NSFileSystem } from "nativescript-angular/file-system/ns-file-system";

import { Page } from "ui/page";
import { TextView} from 'ui/text-view';
import { NSRememberLocationStrategy } from "../router/remember-location-strategy";
import { LocationStrategy } from '@angular/common';
//import application = require('application');
//import {NS_ROUTER_PROVIDERS} from "nativescript-angular/router/ns-router";

const _reflect: any = Reflect;

export interface IRegisterElement {
    name: string,
    resolver: () => ViewClass
};

export interface IAppConfig<T> {
    registerElements ? : IRegisterElement[],
    directives ? : any[],
    selector: string,
    providers ? : any[],
    template ? : string,
    appOptions? : AppOptions,
    appStartup? : (appRef: ComponentRef<T>) => void,
    designMode? : boolean
}



export function App<T>(config: IAppConfig<T>) {
    return (startingComponent) => {
        console.log("Setup App annotations");

        let registerElements: IRegisterElement[] = config.registerElements 
            ? config.registerElements 
            : [];

        // get current annotations
        let annotations = _reflect.getMetadata('annotations', startingComponent) || [];

        config.selector = 'main';
        config.template = `<page-router-outlet></page-router-outlet>`;

        var http = [
            HTTP_PROVIDERS,
            provide(XSRFStrategy, { useValue: new NSXSRFStrategy() }),
            provide(Http, { useFactory: (backend, options, nsFileSystem) => {
                return new NSHttp(backend, options, nsFileSystem);
            }, deps: [XHRBackend, RequestOptions, NSFileSystem]})        
        ];
        
        //switch to design mode (remembers the previous page that was navigated to. )
        let baseConfig = config.designMode ? [
            http,
            NS_ROUTER_PROVIDERS,
            //overide again
            NSRememberLocationStrategy,
            provide(LocationStrategy, { useExisting: NSRememberLocationStrategy}),
            provide(NSLocationStrategy, { useExisting: NSRememberLocationStrategy})
        ] : [
            http,
            NS_ROUTER_PROVIDERS
        ];

        config.providers = config.providers 
            ? config.providers.concat(baseConfig) 
            : [baseConfig];

        config.directives = config.directives 
            ? config.directives.concat(NS_ROUTER_DIRECTIVES) 
            : [NS_ROUTER_DIRECTIVES];

        annotations.push(new Component(config));

        _reflect.defineMetadata('annotations', annotations, startingComponent);
        
        nativeScriptBootstrap(startingComponent, config.providers, config.appOptions).then((appRef) => {
            registerElements.forEach(element => {
                // let injector = appRef.injector;
                // let page: Page = injector.get(Page);
                
                console.log("Add element: " + element.name);
                registerElement(element.name, element.resolver)
            }); 
            
            // if(config.appStartup){
            //     config.appStartup(appRef);
            // }
        });
        
        return startingComponent;
    }
}