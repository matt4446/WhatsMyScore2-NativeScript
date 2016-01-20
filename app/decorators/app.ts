import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {nativeScriptBootstrap} from 'nativescript-angular/application';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, LocationStrategy} from "angular2/router";

const _reflect: any=Reflect;

export function App(config: any={}) {
  return (cls) => {
    console.log("Setup App annotations");
    // get current annotations
    let annotations = _reflect.getMetadata('annotations', cls) || [];

    config.selector = 'main';
    config.template = "<router-outlet></router-outlet>";
    
    config.directives = config.directives ? config.directives.concat(ROUTER_DIRECTIVES) : ROUTER_DIRECTIVES;
    //config.directives = [ROUTER_DIRECTIVES];
    // create @Component
    annotations.push(new Component(config));

    // redefine with added annotations
    _reflect.defineMetadata('annotations', annotations, cls);

    return cls;
  }
}