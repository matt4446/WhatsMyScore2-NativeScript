import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, LocationStrategy} from "angular2/router";
import {NS_ROUTER_DIRECTIVES} from "nativescript-angular/router/ns-router";

const _reflect: any=Reflect;

export function App(config: any={}) {
  return (cls) => {
    console.log("Setup App annotations");
    // get current annotations
    let annotations = _reflect.getMetadata('annotations', cls) || [];

    config.selector = 'main';
    //config.template = "<nav></nav><router-outlet></router-outlet>";
    config.template = `
    <StackLayout>
    <page-router-outlet></page-router-outlet>
    </StackLayout>
    `;
    
    
    config.directives = config.directives 
        ? config.directives.concat(NS_ROUTER_DIRECTIVES) 
        : NS_ROUTER_DIRECTIVES;

    annotations.push(new Component(config));

    _reflect.defineMetadata('annotations', annotations, cls);

    return cls;
  }
}