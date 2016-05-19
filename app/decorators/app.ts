import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from "@angular/router-deprecated";

import { bind, provide, Inject, Component, ComponentRef } from '@angular/core';
import { NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS } from "nativescript-angular/router";
import { registerElement, ViewClass } from "nativescript-angular/element-registry";
import { HTTP_PROVIDERS } from "@angular/http";
import { nativeScriptBootstrap, bootstrap, AppOptions } from "nativescript-angular/application";
import { Page } from "ui/page";
import { TextView} from 'ui/text-view';

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
    appStartup? : (appRef: ComponentRef<T>) => void
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

        config.providers = config.providers 
            ? config.providers.concat(NS_ROUTER_PROVIDERS, HTTP_PROVIDERS) 
            : [NS_ROUTER_PROVIDERS, HTTP_PROVIDERS];

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