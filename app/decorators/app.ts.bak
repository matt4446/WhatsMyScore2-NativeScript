import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, LocationStrategy} from "angular2/router";
import {NS_ROUTER_DIRECTIVES,NS_ROUTER_PROVIDERS} from "nativescript-angular/router";
import {registerElement, ViewClass} from "nativescript-angular/element-registry";
import {HTTP_PROVIDERS} from "angular2/http";

const _reflect: any=Reflect;

export interface IRegisterElement {
    name: string,
    resolver: () => ViewClass
};

export interface IAppConfig {
    registerElements : IRegisterElement[],
    directives? : any[],
    selector: string,
    providers?: any[],
    template?: string
}

export function App(config: IAppConfig) {
  return (cls) => {
    console.log("Setup App annotations");
    
    console.log("Add CardView");
    
    let registerElements : IRegisterElement[] = config.registerElements 
        ? config.registerElements
        : [];
     
    registerElements.forEach(element => {
        console.log("Add element: " + element.name);
        registerElement(element.name, element.resolver)
    });
        
    // get current annotations
    let annotations = _reflect.getMetadata('annotations', cls) || [];

    config.selector = 'main';
    //config.template = "<nav></nav><router-outlet></router-outlet>";
    config.template = `
    <StackLayout>
        <page-router-outlet></page-router-outlet>
    </StackLayout>
    `;
    
    config.providers = config.providers
        ? config.providers.concat(NS_ROUTER_PROVIDERS, HTTP_PROVIDERS)
        : [NS_ROUTER_PROVIDERS,HTTP_PROVIDERS];
        
    config.directives = config.directives 
        ? config.directives.concat(NS_ROUTER_DIRECTIVES) 
        : [NS_ROUTER_DIRECTIVES];

    annotations.push(new Component(config));

    _reflect.defineMetadata('annotations', annotations, cls);

    return cls;
  }
}