import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, LocationStrategy} from "angular2/router";

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
    <router-outlet></router-outlet>
    </StackLayout>
    `;
    
    
    config.directives = config.directives 
        ? config.directives.concat(ROUTER_DIRECTIVES) 
        : ROUTER_DIRECTIVES;

    annotations.push(new Component(config));

    _reflect.defineMetadata('annotations', annotations, cls);

    return cls;
  }
}