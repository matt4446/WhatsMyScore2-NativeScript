import { Component, ChangeDetectionStrategy } from 'angular2/core';
import {NgIf, NgFor} from "angular2/common";
import {NxNav} from "../controls/nav/nav";
import {NxList} from "../controls/list/list";
import {NxListItem} from "../controls/list/list-item";
import {NxHeader} from "../controls/list/header";
import {NxCard} from "../controls/card/card";
import {NxDrawer} from "../controls/drawer/drawer";
import {IonIcon,NavIcon} from "../controls/icons/ion-icon";
import {NS_ROUTER_DIRECTIVES,NS_ROUTER_PROVIDERS} from "nativescript-angular/router";


const _reflect: any = Reflect;

export interface IPageControlConfig {
    selector?: string;
    
    templateUrl?: string;
    template?: string;
    directives?: any[];
    providers?: any[];
    inputs?: any[];
    outputs?: any[];
    pipes?: any[];
    host?: {
        'class' : string 
    }
}
export function PageControl(config: IPageControlConfig={}) {
    return (cls) =>
    {
        var annotations = _reflect.getMetadata('annotations', cls) || [];
        var componentConfig: any = config;

        componentConfig.changeDetection = ChangeDetectionStrategy.OnPush;
        
        var nxDirectives = [NxDrawer, NxCard, NxNav, NxList, NxListItem, NxHeader, IonIcon, NgIf, NgFor];
        var providers = [];
        
        config.directives = config.directives 
            ? config.directives.concat(nxDirectives) 
            : nxDirectives;

        config.providers = config.providers
            ? config.providers.concat(providers)
            : providers;

        annotations.push(new Component(componentConfig));

        _reflect.defineMetadata('annotations', annotations, cls);

        return cls;
    }
}